function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timestamp() {
  return new Date().toISOString();
}

async function execute({ type, model, prompt, inputs, duration, index }) {
  const callIndex = index ?? 0;

  console.log(
    `[mock] ${timestamp()} start type=${type} index=${callIndex} model=${model ?? 'default'}`
  );

  await wait(200); // simulates submitting job to AI API

  for (let poll = 1; poll <= 3; poll++) {
    console.log(`[mock] ${timestamp()} poll ${poll}/3 type=${type} index=${callIndex}`);
    await wait(300); // simulates polling for result
  }

  const url = `s3://mock-bucket/${type}-${Date.now()}-${callIndex}.jpg`;

  console.log(
    `[mock] ${timestamp()} done type=${type} index=${callIndex} prompt="${prompt}" inputs=${JSON.stringify(inputs)} duration=${duration ?? 'n/a'} -> ${url}`
  );

  return url;
}

module.exports = { execute };
