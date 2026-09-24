# Image Model Prompt Guides

---

## Gemini Image / Nano Banana

### About the model
Nano Banana is Google's brand name for Gemini native image generation.
Available in the Gemini app, Google AI Studio, Gemini API, Vertex AI and Firebase.
Imagen models are shut down — Google points all image generation to Nano Banana.

**Model family** (verified 2026-09 — the lineup rotates; re-check
`ai.google.dev/gemini-api/docs/image-generation` before quoting IDs in code):

| Brand name | Technical name | API model ID | Resolution / ratios | Reference images |
|---|---|---|---|---|
| Nano Banana 2 (go-to) | Gemini 3.1 Flash Image | `gemini-3.1-flash-image` | 512px–4K, 14 ratios incl. 1:4, 4:1, 1:8, 8:1 | 10 objects + 4 characters |
| Nano Banana Pro | Gemini 3 Pro Image | `gemini-3-pro-image` | 1K–4K, 10 ratios | 6 objects + 5 characters + 3 styles |
| Nano Banana 2 Lite | Gemini 3.1 Flash Lite Image | `gemini-3.1-flash-lite-image` | 1K only, 10 ratios | 14 objects; weak at multi-turn editing |
| Nano Banana (legacy) | Gemini 2.5 Flash Image | `gemini-2.5-flash-image` | ~1K only | best with ≤3; **shuts down 2026-10-02** |

The `-preview` IDs were shut down on 2026-06-25 — never put them in code.

**Gemini app:** Nano Banana 2 is the default (Fast / Thinking / Pro modes),
Lite runs in Flash-Lite mode, and paid plans can "Redo with Pro".

Known for:
- Character consistency across edits (use the character reference slots)
- Text rendering in images (posters, infographics, labels)
- Multi-image blending (combine references into one scene)
- Google Search grounding (Pro + NB2) and Image Search grounding (NB2 only) —
  real places, products, current events. Lite has no grounding
- Thinking is always on for Gemini 3 image models (NB2 / Lite let you set the level)
- One-shot editing: "change the background to a snowy forest" works reliably

### Generation prompt structure
```
[Action verb: Generate/Create] [a/an] [subject + key descriptors],
[action or pose],
[scene or setting],
[lighting conditions],
[visual style / medium],
[mood or atmosphere],
[aspect ratio if applicable].
```

### Key behaviors
- **Leans toward photorealism by default** — explicitly name a non-realistic
  style if you don't want photorealism ("flat vector illustration", "watercolor",
  "3D render with clay texture")
- **World knowledge works** — you can reference "a New York City bodega in
  winter" and it knows what that looks like
- **Text in images works well** — include exact text in quotes:
  `a poster with the text "GRAND OPENING" in bold white letters`
- **Long or critical text** — generate the copy first, then ask for the image
  containing that exact text
- **Iterative editing** — after generating, send follow-up prompts describing
  only the change. Do not re-describe the whole image.
- **Multi-reference** — you can upload multiple images and ask it to combine
  elements: "use the person from image 1 in the setting from image 2"
- **Semantic negatives** — describe the positive state ("an empty, quiet
  street") rather than "no cars"
- **Photographic control** — lens, angle and shot terms work: "85mm portrait,
  low angle, shallow depth of field"
- **Aspect ratio** — state it in the prompt ("Aspect ratio 16:9.") for the app;
  in the API also set it in `response_format` (`aspect_ratio`, and `image_size`
  with an uppercase K, e.g. `"2K"`)

### Generation examples

**Product photography:**
```
Generate a professional product photograph of a small glass bottle of
serum with a dropper cap, placed on a white marble surface with a sprig
of dried lavender beside it, soft studio lighting from the left,
clean white background, commercial beauty photography style,
1:1 aspect ratio.
```

**UI marketing image:**
```
Create a clean app marketing image showing a smartphone screen displaying
a dark-themed dashboard with teal accents, the phone floating at a slight
angle on a deep navy background, soft gradient light from above,
modern tech product photography style, 16:9 aspect ratio.
```

**Infographic with text:**
```
Generate a professional infographic titled "How It Works" with 3 numbered
steps arranged vertically. Step 1: "Upload your brief", Step 2: "AI generates
directions", Step 3: "Export to Figma". Use a clean white background,
deep navy (#0F1C3F) headings, teal (#1D9E75) accent icons, Inter font style,
generous padding. 2:3 aspect ratio.
```

**Portrait with character consistency:**
```
Generate a professional headshot photo of a woman in her early 30s,
wearing a white blazer over a navy top, standing against a soft blurred
office background, natural window light, confident and approachable
expression, editorial portrait photography style, 3:4 aspect ratio.
```

### Editing prompt structure (after an existing image)
```
[Keep/preserve] [what to keep], [change/replace/add/remove] [what to change]
to [desired result]. Keep everything else exactly the same.
```

### Editing examples
```
Keep the person and outfit exactly as is, change the background to a
sun-lit café interior with soft bokeh. Keep everything else the same.
```
```
Add a wooden sign above the door that reads "STUDIO 12" in carved letters.
Keep the rest of the scene unchanged.
```
```
Replace the product label with one that says "CLARITY SERUM" in sans-serif
black text on a white label. Keep the bottle, surface, and lighting the same.
```

---

## OpenAI — GPT Image 2.5 (Flare / Sunburst)

### About the models
Verified 2026-09 — re-check `developers.openai.com/api/docs/guides/image-generation`
before quoting IDs in code.

| Model | API ID | Use for |
|---|---|---|
| GPT Image 2.5 Flare | `gpt-image-2.5-flare` | Default: fast, high quality |
| GPT Image 2.5 Sunburst | `gpt-image-2.5-sunburst` | Maximum quality, precise edits, dense text |
| GPT Image 2 (older) | `gpt-image-2` | Still supported |

- **ChatGPT Images 2.5** runs on these models (Flare by default, escalating to
  Sunburst for complex prompts), up to 4K, with comment-based edits and a sketch tool.
- **Retired:** DALL-E 2 / DALL-E 3 (API shut down 2026-05-12; the ChatGPT DALL·E GPT
  was retired 2026-08-30). `gpt-image-1` shuts down 2026-10-23; `gpt-image-1.5`,
  `gpt-image-1-mini` and `chatgpt-image-latest` shut down 2026-12-01. If a user asks
  for a "DALL-E prompt", write a GPT Image prompt and say so.

### Generation prompt structure
OpenAI's guide recommends stating the intended use first, then labelled sections
for complex prompts (plain prose also works — no special syntax needed):

```
Intended use: [e.g. hero image for a fintech landing page, 16:9]

Scene: [setting, background, lighting, time of day]
Subject: [main subject, pose, framing, gaze]
Details: [medium / style, materials, color palette, mood, "photorealistic" if wanted]
Constraints: [exact text in quotes + position + typography; what must not appear]
```

### Key behaviors
- **More detail = better results** — unlike Stitch (where less is more),
  OpenAI models reward specific, visible detail
- **Say "photorealistic" explicitly** when that is the goal
- **Exact text** — put it in quotes, give position and typography, spell unusual
  words letter by letter, and add "Render the text exactly once."
- **Exclusions are officially recommended** — "No extra text, no watermarks,
  no unrelated logos." (Opposite of Gemini, where positive phrasing works better)
- **Prompt rewriting** — in the Responses API the mainline model rewrites the
  prompt; the final version comes back as `revised_prompt`
- **Editing** — "Change only [X]. Preserve [identity, geometry, layout, lighting,
  labels]." Label references by number and role ("Image 1: subject, Image 2: style")
- **Iterate one change per turn** and restate what must be preserved
- **Transparent backgrounds** — API `background: "transparent"` with `png` or
  `webp`. A checkerboard described in the prompt is not transparency
- **Known limits** — text placement can still be imprecise, recurring characters
  and brand elements can drift, precise layouts are hard

### API parameters
Size and quality are parameters, not prompt text. Keep the ratio in the prompt
too, but make sure `size` matches it.

| Parameter | Values | Notes |
|---|---|---|
| `quality` | `low`, `medium`, `high`, `xhigh`, `max`, `auto` | `xhigh` / `max` only on 2.5 models |
| `size` | `auto`, `1024x1024`, `1536x1024`, `1024x1536`, or custom `WxH` | Custom: edges multiple of 16, ≤3840px, ratio 1:3–3:1; above 2560x1440 is experimental |
| `background` | `auto`, `opaque`, `transparent` | Transparent needs png / webp |
| `output_format` | `png`, `jpeg`, `webp` | `output_compression` for jpeg / webp only |
| `moderation` | `auto`, `low` | |

There is no `style` parameter (that was DALL-E 3).

### Generation examples

**Flat vector illustration:**
```
Flat vector illustration style, a friendly robot sitting at a wooden desk
reading a glowing book, warm yellow desk lamp light, soft pastel background
in light blue and cream, minimal detail, clean lines, children's book
aesthetic, 1:1 aspect ratio.
```

**Concept art / editorial:**
```
Digital concept art, a lone architect standing on the rooftop of an unfinished
skyscraper at sunset, overlooking a dense city skyline wrapped in golden fog,
dramatic cinematic lighting, warm orange and deep blue color palette,
hyper-detailed, painterly finish, 16:9 aspect ratio.
```

**Brand illustration:**
```
Minimalist editorial illustration, a pair of hands holding a small glowing
plant sprouting from a coin, representing sustainable investment, flat color
palette in forest green, cream, and warm brown, no outlines, geometric shapes,
modern fintech brand aesthetic, 1:1 aspect ratio.
```

**Marketing hero image (labelled structure):**
```
Intended use: hero image for a productivity app landing page, 16:9.

Scene: light oak desk in an airy home office, soft natural light from a
window on the left, neutral warm tones.
Subject: a laptop beside a ceramic coffee mug and a small succulent,
shot at eye level, shallow depth of field.
Details: photorealistic, clean product marketing photography, minimal props.
Constraints: no visible brand logos, no text, no watermarks.
```

### Iterative editing in ChatGPT Images / Responses API (conversational)
After generating an image, continue in the same conversation — one change per turn:

```
Change only the color palette to cooler tones — deep navy and slate instead
of warm browns. Preserve the composition, lighting and subject.
```
```
Add a subtle lens flare from the upper right corner. Keep everything else the same.
```
```
Blur the background slightly more to increase depth of field. Keep the subject sharp.
```

---

## Choosing the Right Model

No official head-to-head exists — rows marked *(heuristic)* are working
judgment, not vendor claims.

| Need | Use |
|---|---|
| Consistent characters across multiple images | Gemini (NB2: 4 character refs, Pro: 5) |
| Readable text inside the image | Either — Gemini NB2 / Pro or GPT Image 2.5 Sunburst |
| Edit an existing photo with precision | Gemini NB2 / Pro, or GPT Image 2.5 Sunburst |
| Combine elements from multiple reference images | Gemini (up to 14 refs) |
| Style reference images | Gemini Pro (3 style slots) |
| Artistic / illustrated style (watercolor, oil, concept art) | OpenAI *(heuristic)* |
| Strong composition with cinematic feel | OpenAI *(heuristic)* |
| Iterative in-conversation editing | OpenAI (ChatGPT / Responses API) or Gemini NB2 / Pro — not Lite |
| Transparent background (logo, asset) | OpenAI (`background: "transparent"`) |
| UI/marketing images with real-world context | Gemini with Search grounding |
| Photorealistic portraits or product photography | Either *(heuristic: Gemini leans photoreal by default)* |
| Cheapest high-volume generation | Gemini NB2 Lite or GPT Image 2.5 Flare |
