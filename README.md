# OCD Hire Task — Darshan Soni

## How to run

```bash
node test/run.js
```

That's it. No npm install, no API keys, no accounts, no setup. Just Node.js. Clone the repo and run one command.

---

## Console output (actual run)

```
PS D:\ocd\test> node run.js
[workflow] 2026-05-05T18:06:00.919Z tier 1/2 start: s1
[workflow] 2026-05-05T18:06:00.928Z step s1 start: Hero shot
[mock] 2026-05-05T18:06:00.929Z start type=image_generation index=0 model=default
[mock] 2026-05-05T18:06:01.136Z poll 1/3 type=image_generation index=0
[mock] 2026-05-05T18:06:01.449Z poll 2/3 type=image_generation index=0
[mock] 2026-05-05T18:06:01.764Z poll 3/3 type=image_generation index=0
[mock] 2026-05-05T18:06:02.077Z done type=image_generation index=0 prompt="Product photo 9:16 ratio" inputs={"ref":"s3://user-uploads/user-123/job-001/product.jpg","ratio":"9:16"} duration=n/a -> s3://mock-bucket/image_generation-1778004362077-0.jpg
[workflow] 2026-05-05T18:06:02.078Z step s1 end: outputs heroShot
[checkpoint] tier 1 — stepOutputs keys: [ 's1' ]
[workflow] 2026-05-05T18:06:02.141Z tier 1 checkpoint saved
[workflow] 2026-05-05T18:06:02.142Z tier 2/2 start: s2, s3
[workflow] 2026-05-05T18:06:02.142Z step s2 start: Lifestyle shots
[mock] 2026-05-05T18:06:02.142Z start type=image_generation index=0 model=default
[mock] 2026-05-05T18:06:02.142Z start type=image_generation index=1 model=default
[mock] 2026-05-05T18:06:02.143Z start type=image_generation index=2 model=default
[workflow] 2026-05-05T18:06:02.143Z step s3 start: Product video
[mock] 2026-05-05T18:06:02.143Z start type=image_to_video index=0 model=default
[mock] 2026-05-05T18:06:02.344Z poll 1/3 type=image_generation index=0
[mock] 2026-05-05T18:06:02.345Z poll 1/3 type=image_generation index=1
[mock] 2026-05-05T18:06:02.346Z poll 1/3 type=image_generation index=2
[mock] 2026-05-05T18:06:02.346Z poll 1/3 type=image_to_video index=0
[mock] 2026-05-05T18:06:02.660Z poll 2/3 type=image_generation index=0
[mock] 2026-05-05T18:06:02.660Z poll 2/3 type=image_generation index=1
[mock] 2026-05-05T18:06:02.660Z poll 2/3 type=image_generation index=2
[mock] 2026-05-05T18:06:02.661Z poll 2/3 type=image_to_video index=0
[mock] 2026-05-05T18:06:02.974Z poll 3/3 type=image_generation index=0
[mock] 2026-05-05T18:06:02.974Z poll 3/3 type=image_generation index=1
[mock] 2026-05-05T18:06:02.975Z poll 3/3 type=image_generation index=2
[mock] 2026-05-05T18:06:02.975Z poll 3/3 type=image_to_video index=0
[mock] 2026-05-05T18:06:03.287Z done type=image_generation index=0 prompt="Female model with product" inputs={"ref":"s3://user-uploads/user-123/job-001/product.jpg"} duration=n/a -> s3://mock-bucket/image_generation-1778004363287-0.jpg
[mock] 2026-05-05T18:06:03.287Z done type=image_generation index=1 prompt="Female model with product" inputs={"ref":"s3://user-uploads/user-123/job-001/product.jpg"} duration=n/a -> s3://mock-bucket/image_generation-1778004363287-1.jpg
[mock] 2026-05-05T18:06:03.287Z done type=image_generation index=2 prompt="Female model with product" inputs={"ref":"s3://user-uploads/user-123/job-001/product.jpg"} duration=n/a -> s3://mock-bucket/image_generation-1778004363287-2.jpg
[workflow] 2026-05-05T18:06:03.288Z step s2 end: outputs lifestyleShots
[mock] 2026-05-05T18:06:03.288Z done type=image_to_video index=0 prompt="Cinematic 360 rotation" inputs={"src":"s3://mock-bucket/image_generation-1778004362077-0.jpg"} duration=5 -> s3://mock-bucket/image_to_video-1778004363288-0.jpg
[workflow] 2026-05-05T18:06:03.288Z step s3 end: outputs productVideo
[checkpoint] tier 2 — stepOutputs keys: [ 's1', 's2', 's3' ]
[workflow] 2026-05-05T18:06:03.350Z tier 2 checkpoint saved
[workflow] 2026-05-05T18:06:03.351Z workflow completed

=== FINAL JOB ===
{
  "jobId": "job-test-001",
  "userId": "user-123",
  "templateId": "test-001",
  "status": "completed",
  "currentTier": 2,
  "totalTiers": 2,
  "inputFiles": [
    "s3://user-uploads/user-123/job-001/product.jpg"
  ],
  "userInputs": {
    "aspectRatio": "9:16",
    "modelGender": "Female",
    "modelEthnicity": "South Asian"
  },
  "stepOutputs": {
    "s1": {
      "heroShot": "s3://mock-bucket/image_generation-1778004362077-0.jpg"
    },
    "s2": {
      "lifestyleShots": [
        "s3://mock-bucket/image_generation-1778004363287-0.jpg",
        "s3://mock-bucket/image_generation-1778004363287-1.jpg",
        "s3://mock-bucket/image_generation-1778004363287-2.jpg"
      ]
    },
    "s3": {
      "productVideo": "s3://mock-bucket/image_to_video-1778004363288-0.jpg"
    }
  },
  "finalOutputs": [
    {
      "label": "Hero Shot",
      "type": "image",
      "url": "s3://mock-bucket/image_generation-1778004362077-0.jpg"
    },
    {
      "label": "Lifestyle Shots",
      "type": "image[]",
      "url": [
        "s3://mock-bucket/image_generation-1778004363287-0.jpg",
        "s3://mock-bucket/image_generation-1778004363287-1.jpg",
        "s3://mock-bucket/image_generation-1778004363287-2.jpg"
      ]
    },
    {
      "label": "Product Video",
      "type": "video",
      "url": "s3://mock-bucket/image_to_video-1778004363288-0.jpg"
    }
  ],
  "createdAt": "2026-05-05T18:06:00.917Z",
  "errorMessage": null,
  "completedAt": "2026-05-05T18:06:03.351Z"
}

```

Tier 2 proof — s2 (3 parallel calls) and s3 all start at `.716Z` and `.717Z`. That's within 1ms of each other. That's parallelism working.

---

## Bug 1 - Wrong tier number in status

The original code had:

```js
job.status = `tier_${i}_of_${executionOrder.length}`;
```

Since the loop starts at `i = 0`, the first tier was showing `tier_0_of_2` instead of `tier_1_of_2`. Tiers are meant to be 1-based The fix is just `i + 1`:

```js
job.status = `tier_${i + 1}_of_${executionOrder.length}`;
```

---

## Bug 2 - Steps running one by one instead of in parallel

The original code :

```js
for (const stepId of tier) {
  const result = await executeStep(stepDef, job);
  results.push(result);
}
```

`for...await` is sequential  it waits for each step to fully finish before starting the next one. So in Tier 2, s2 would run completely (1.1 seconds), then s3 would start. Total time: 2.2 seconds.

At scale this completely kills the engine. If a tier has 5 parallel image generation calls each taking 10 seconds, sequential execution takes 50 seconds. With `Promise.all` it takes 10 seconds. The whole point of putting steps in the same tier is that they run at the same time. 

The fix:

```js
const results = await Promise.all(
  tier.map(async stepId => {
    const output = await executeStep(stepDef, job);
    return { stepId, output };
  })
);
```

Now all steps in a tier fire simultaneously and we wait for all of them together.

---

## Bug 3 - Wiping stepOutputs after completion

The original code :

```js
job.status = 'completed';
job.stepOutputs = {}; // BUG
return job;
```

This clears all the step outputs after the job finishes.

The whole crash recovery system works because after every tier, we save `stepOutputs` to the database via `saveCheckpoint`. If the server crashes midjob and the job gets picked up again, the runner checks `isStepComplete` before executing each step — if the output is already in `stepOutputs`, it skips that step entirely and moves on.

If `stepOutputs` gets wiped, that mechanism is broken. Any code that inspects the completed job later sees an empty object. And if somehow the job gets retried after completion, every step runs again from zero  meaning you're paying for AI API calls that already happened. In production with real Freepik or Runway calls that cost money per generation.

The fix is just deleting that one line. `stepOutputs` should never be changed after the job finishes.

---

## Freepik stub 

Right now `freepik.js` is a simulation — it uses `setTimeout` instead of real HTTP calls To make it real we replace three things:

The submit step becomes an actual `POST` to `https://api.freepik.com/v1/ai/mystic` with the prompt, model, and input image in the body, and `x-freepik-api-key` in the header. That returns a `task_id`.

The polling loop becomes real `GET` requests to `https://api.freepik.com/v1/ai/mystic/{task_id}` every few seconds until the status comes back as `completed`.

The response handling  Freepik returns the image as base64, not a URL. So you decode it with `Buffer.from(base64, 'base64')`, upload the raw bytes to S3, and return the S3 URL. That's why the output has to go through S3  the engine always expects a URL back from any provider, so you can't just return the base64 string directly.

Everything else stays exactly the same. 

---

## Bonus — Resume from tier (crash recovery)

Before executing any step, the runner calls `isStepComplete`:

```js
function isStepComplete(job, stepDef) {
  return job.stepOutputs?.[stepDef.stepId]?.[stepDef.outputKey] !== undefined;
}
```

It just checks if the output key already exists in `stepOutputs`. If it does, the step gets skipped with a log saying "skipped: existing heroShot" and the existing output is returned as-is.

So if a server crashes midjob after Tier 1 completes — s1's output is already  in the DB. When the job gets reloaded and retried Tier 1's step is skipped entirely Tier 2 runs fresh. The user doesn't restart from zero and you don't pay for s1 again.

