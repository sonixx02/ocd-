
## 1. If one step in a tier fails, all other steps in that tier stop too

`Promise.all` has fail-fast behaviour. If s2 throws, `Promise.all` immediately rejects
and the catch block runs — even if s3 was still running fine in the background. s3's
result gets silently discarded because nobody is listening for it anymore.

This means if s2 and s3 are in the same tier and s2 fails, s3 never gets merged into
`stepOutputs` even if it completed successfully.
---



## 2. runWorkflow always resolves — it never rejects

Even if a step throws, `runWorkflow` catches the error internally, sets
`job.status = 'failed'` and `job.errorMessage = err.message`, and returns the job.
The promise returned by `runWorkflow` never rejects. The caller always gets the job
object back and can inspect `status` to know what happened.

---

## 3. Simplified variable resolution — dot notation only for current templates

The spec mentions `{{steps.s2.shots[1]}}` bracket notation -> simplified it because every single reference actually used in the templates is dot notation only — no template uses
bracket access 

---

## 4. Parallel step results are merged after Promise.all — not during

Inside the `tier.map()`, each step returns `{ stepId, output }` but doesn't write to
`job.stepOutputs` directly. The merge only happens after `Promise.all` resolves and
we have all results. This avoids a race condition where two concurrent steps could
overwrite each other's output mid-write.
---

## 5. saveCheckpoint is kept as a separate function intentionally

Keeping it isolated means when that time comes,we replace one function body and nothing else in the engine changes. 
---



## 6. executionOrder is trusted — no dependency graph analysis

The engine does not check whether step references in `inputs` match the
`executionOrder`. If a  author puts s3 (which references `steps.s1.heroShot`)
in Tier 1 before s1 has run, the engine will throw `Variable "steps.s1.heroShot"
resolved to undefined`. It is the  author's responsibility to order tiers
correctly. The engine enforces nothing about dependencies — it just executes what it's
told in the order it's told.

---
