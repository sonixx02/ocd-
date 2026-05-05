const { executeStep } = require('./stepExecutor');

function timestamp() {
  return new Date().toISOString();
}

async function saveCheckpoint(job) {
  await new Promise(r => setTimeout(r, 50)); // simulates DynamoDB write
  console.log('[checkpoint] tier', job.currentTier,
    '— stepOutputs keys:', Object.keys(job.stepOutputs));
}

function getStepDef(steps, stepId) {
  const stepDef = steps.find(step => step.stepId === stepId);

  if (!stepDef) {
    throw new Error(`Step definition not found for stepId "${stepId}"`);
  }

  return stepDef;
}

function isStepComplete(job, stepDef) {
  return job.stepOutputs?.[stepDef.stepId]?.[stepDef.outputKey] !== undefined;
}

function getOutputValue(job, key) {
  const [stepId, ...pathParts] = key.split('.');
  let value = job.stepOutputs?.[stepId];

  for (const part of pathParts) {
    if (value === undefined || value === null) {
      return undefined;
    }

    value = value[part];
  }

  return value;
}

function buildFinalOutputs(outputSchema, job) {
  return outputSchema.map(output => {
    const value = getOutputValue(job, output.key);

    if (value === undefined) {
      throw new Error(`Output schema key "${output.key}" resolved to undefined`);
    }

    return {
      label: output.label,
      type: output.type,
      url: value,
    };
  });
}

async function runWorkflow(job, template) {
  const workflow = template?.workflow;

  if (!workflow) {
    throw new Error('Template is missing workflow');
  }

  const { executionOrder, steps, outputSchema } = workflow;

  job.stepOutputs = job.stepOutputs ?? {};
  job.finalOutputs = job.finalOutputs ?? [];
  job.totalTiers = executionOrder.length;
  job.errorMessage = null;

  try {
    for (let i = 0; i < executionOrder.length; i++) {
      const tier = executionOrder[i];
      job.currentTier = i + 1;
      job.status = `tier_${i + 1}_of_${executionOrder.length}`;

      console.log(
        `[workflow] ${timestamp()} tier ${job.currentTier}/${executionOrder.length} start: ${tier.join(', ')}`
      );

      const results = await Promise.all(
        tier.map(async stepId => {
          const stepDef = getStepDef(steps, stepId);

          if (isStepComplete(job, stepDef)) {
            console.log(
              `[workflow] ${timestamp()} step ${stepId} skipped: existing ${stepDef.outputKey}`
            );
            return { stepId, output: job.stepOutputs[stepId] };
          }

          console.log(
            `[workflow] ${timestamp()} step ${stepId} start: ${stepDef.label ?? stepDef.type}`
          );

          const output = await executeStep(stepDef, job);

          console.log(
            `[workflow] ${timestamp()} step ${stepId} end: outputs ${Object.keys(output).join(', ')}`
          );

          return { stepId, output };
        })
      );

      for (const { stepId, output } of results) {
        job.stepOutputs[stepId] = output;
      }

      await saveCheckpoint(job);
      console.log(`[workflow] ${timestamp()} tier ${job.currentTier} checkpoint saved`);
    }

    job.finalOutputs = buildFinalOutputs(outputSchema, job);
    job.status = 'completed';
    job.completedAt = new Date().toISOString();

    console.log(`[workflow] ${timestamp()} workflow completed`);
    return job;
  } catch (err) {
    job.status = 'failed';
    job.errorMessage = err.message;

    console.log(`[workflow] ${timestamp()} workflow failed: ${job.errorMessage}`);
    return job;
  }
}

module.exports = { runWorkflow };
