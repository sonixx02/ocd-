const mockProvider = require('./providers/mock');
const freepikProvider = require('./providers/freepik');

const providers = {
  mock: mockProvider,
  freepik: freepikProvider,
};

function resolveReference(ref, job) {
  const trimmed = ref.trim();

  if (trimmed === 'userUpload') {
    const value = job.inputFiles?.[0];
    if (value === undefined) throw new Error('Variable "userUpload" resolved to undefined');
    return value;
  }

  if (trimmed.startsWith('userInputs.')) {
    const key = trimmed.slice('userInputs.'.length);
    const value = job.userInputs?.[key];
    if (value === undefined) throw new Error(`Variable "${trimmed}" resolved to undefined`);
    return value;
  }

  if (trimmed.startsWith('steps.')) {
    const path = trimmed.slice('steps.'.length);
    // split on dots and brackets: 's2.shots[1]' → ['s2', 'shots', '1']
    const tokens = path.split(/[.\[\]]+/).filter(Boolean);
    let value = job.stepOutputs;
    for (const token of tokens) {
      if (value === undefined || value === null) break;
      value = value[isNaN(token) ? token : Number(token)];
    }
    if (value === undefined) throw new Error(`Variable "${trimmed}" resolved to undefined`);
    return value;
  }

  throw new Error(`Unknown variable reference "${trimmed}"`);
}

// Resolves all {{...}} placeholders in a value.
// - Strings: replaces each {{...}} with its resolved value
// - Objects: recursively resolves all values inside
// - Anything else: returned as-is
function resolveValue(value, job) {
  if (typeof value === 'string') {
    // If the entire string is one reference, return the raw value to preserve its type.
    // e.g. '{{steps.s2.lifestyleShots}}' should return an array, not '[url1,url2]'
    const fullMatch = value.match(/^{{\s*([^{}]+?)\s*}}$/);
    if (fullMatch) return resolveReference(fullMatch[1], job);

    // Otherwise interpolate each {{...}} into the string
    return value.replace(/{{\s*([^{}]+?)\s*}}/g, (_, ref) => {
      const resolved = resolveReference(ref, job);
      return typeof resolved === 'object' ? JSON.stringify(resolved) : String(resolved);
    });
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, resolveValue(nestedValue, job)])
    );
  }

  return value;
}

async function executeStep(stepDef, job) {
  if (!stepDef) {
    throw new Error('Cannot execute missing step definition');
  }

  if (!stepDef.outputKey) {
    throw new Error(`Step "${stepDef.stepId ?? 'unknown'}" is missing outputKey`);
  }

  const provider = providers[stepDef.provider];

  if (!provider) {
    throw new Error(`Unknown provider "${stepDef.provider}" for step "${stepDef.stepId}"`);
  }

  const prompt = resolveValue(stepDef.prompt ?? '', job);
  const inputs = resolveValue(stepDef.inputs ?? {}, job);
  const payload = {
    type: stepDef.type,
    model: stepDef.model,
    prompt,
    inputs,
    duration: stepDef.duration,
  };

  if (stepDef.executionType === 'single') {
    const result = await provider.execute(payload);
    return { [stepDef.outputKey]: result };
  }

  if (stepDef.executionType === 'parallel') {
    const parallelCount = Number(stepDef.parallelCount);

    if (!Number.isInteger(parallelCount) || parallelCount < 1) {
      throw new Error(`Step "${stepDef.stepId}" has invalid parallelCount`);
    }

    const results = await Promise.all(
      Array.from({ length: parallelCount }, (_, index) =>
        provider.execute({ ...payload, index })
      )
    );

    return { [stepDef.outputKey]: results };
  }

  throw new Error(
    `Unsupported executionType "${stepDef.executionType}" for step "${stepDef.stepId}"`
  );
}

module.exports = { executeStep };