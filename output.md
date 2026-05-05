### Output Explanation 
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
**Tier 1 **

 `s1` starts at **18:06:00.928Z**
 `s1` ends at **18:06:02.078Z**
 Only after this, Tier 2 begins at **18:06:02.142Z** No overlap with other steps → **runs alone **

---

**Tier 2 **

 `s2` starts at **18:06:02.142Z**
 `s3` starts at **18:06:02.143Z**
   Difference = **~1 ms**

---

**s2 Internal Parallelism **

 Three image jobs start at the same timestamp:

   index 0 → **18:06:02.142Z**
   index 1 → **18:06:02.142Z**
   index 2 → **18:06:02.143Z**
     All triggered together 

 Output:

  ```json
  "lifestyleShots": [url1, url2, url3]
  ```

 Returns **array of 3 URLs**

---

**stepOutputs **

```json
"stepOutputs": {
  "s1": {...},
  "s2": {...},
  "s3": {...}
}
```

 Contains all steps → **NOT empty → all steps **

---

**finalOutputs **

```json
[
  { "label": "Hero Shot", "type": "image", ... },
  { "label": "Lifestyle Shots", "type": "image[]", ... },
  { "label": "Product Video", "type": "video", ... }
]
```

Exactly **3 populated outputs**:

1. Hero Shot (single image)
2. Lifestyle Shots (3 images array)
3. Product Video

---


