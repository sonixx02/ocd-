function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timestamp() {
  return new Date().toISOString();
}

async function execute({ type, model, prompt, inputs, duration, index }) {
  if (!process.env.FREEPIK_API_KEY) {
    throw new Error('FREEPIK_API_KEY is required for the freepik provider');
  }

  const callIndex = index ?? 0;

  // Real submit call:
  // POST https://api.freepik.com/v1/ai/mystic
  // Headers:
  // x-freepik-api-key: process.env.FREEPIK_API_KEY
  // Body would include the prompt, model/options, input image references, and aspect ratio.
  console.log(
    `[freepik:stub] ${timestamp()} submit Mystic job type=${type} index=${callIndex} model=${model ?? 'default'}`
  );

  await wait(200);
  const taskId = `mock-freepik-task-${Date.now()}-${callIndex}`;

  let status = 'queued';
  let base64Output = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    // Real polling call:
    // GET https://api.freepik.com/v1/ai/mystic/{task_id}
    // Headers:
    // x-freepik-api-key: process.env.FREEPIK_API_KEY
    console.log(
      `[freepik:stub] ${timestamp()} poll ${attempt}/3 task=${taskId} status=${status}`
    );

    await wait(300);

    status = attempt === 3 ? 'completed' : 'processing';
    if (status === 'completed') {
      base64Output = `mock-base64-output-for-${taskId}`;
      break;
    }
  }

  if (status !== 'completed') {
    throw new Error(`Freepik Mystic task ${taskId} did not complete`);
  }

  // The real API returns base64. Production flow:
  // Buffer.from(base64Output, 'base64') -> upload decoded bytes to S3 -> return S3 URL.
  void base64Output;

  const url = `s3://mock-bucket/freepik-${type}-${Date.now()}-${callIndex}.jpg`;

  console.log(
    `[freepik:stub] ${timestamp()} done type=${type} index=${callIndex} prompt="${prompt}" inputs=${JSON.stringify(inputs)} duration=${duration ?? 'n/a'} -> ${url}`
  );

  return url;
}

module.exports = { execute };
