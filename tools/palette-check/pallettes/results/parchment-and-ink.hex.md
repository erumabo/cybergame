# Palette parchment-and-ink

<span style="color:#f1e2be">&#9632;</span>#f1e2be

<span style="color:#e6d1a1">&#9632;</span>#e6d1a1

<span style="color:#f0d696">&#9632;</span>#f0d696

<span style="color:#caac77">&#9632;</span>#caac77

<span style="color:#a58a62">&#9632;</span>#a58a62

<span style="color:#886243">&#9632;</span>#886243

<span style="color:#c0977a">&#9632;</span>#c0977a

<span style="color:#944431">&#9632;</span>#944431

<span style="color:#d2bc76">&#9632;</span>#d2bc76

<span style="color:#ad9d62">&#9632;</span>#ad9d62

<span style="color:#887c56">&#9632;</span>#887c56

<span style="color:#594a45">&#9632;</span>#594a45

<span style="color:#a9a994">&#9632;</span>#a9a994

<span style="color:#87867a">&#9632;</span>#87867a

<span style="color:#445162">&#9632;</span>#445162

<span style="color:#000000">&#9632;</span>#000000

## APCA Lc Background (X) vs Foreground (Y)

|         | #f1e2be | #f0d696 | #e6d1a1 | #d2bc76 | #caac77 | #886243 | #944431 | #445162 | #594a45 | #000000 |
| ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: |
| #000000 |   89.55 |   83.41 |   80.33 |    68.4 |   61.33 |         |         |         |         |         |
| #594a45 |   72.57 |   66.43 |   63.35 |         |         |         |         |         |         |         |
| #445162 |   71.49 |   65.35 |   62.27 |         |         |         |         |         |         |         |
| #944431 |    66.1 |         |         |         |         |         |         |         |         |         |
| #886243 |   60.44 |         |         |         |         |         |         |         |         |         |
| #d2bc76 |         |         |         |         |         |         |         |         |         |  -67.04 |
| #e6d1a1 |         |         |         |         |         |         |         |  -64.55 |  -65.53 |   -79.8 |
| #f0d696 |         |         |         |         |         |         |  -62.88 |  -67.87 |  -68.86 |  -83.12 |
| #f1e2be |         |         |         |         |         |  -64.16 |  -69.54 |  -74.54 |  -75.52 |  -89.79 |

Values less than 60 are ommited

**Lc usage**

- < 0, Light text - Dark Background
- \> 0, Dark text - Light Background
- 90, "AAA Normal Text (400w 16px)"
- 75, "AA Normal Text (400w 16px), AAA Bold (600w 18px)"
- 60, "AA Bold (600w 18px), UI (No text), Headers"
- 45, "UI (Disabled)"
- 30, "Invisible (Shadows)"

## Posible Palletes:

<style>
  div {
    background-color: var(--background);
    color: var(--text);
    border: 3px solid var(--accent);
    width: max-content;
    height: max-content;
  }
  div span.icon {
    color: var(--accent);
  }
  div pre {
    background-color: var(--background);
  }
  div button.primary {
    background-color: var(--primary);
    color: var(--background);
  }
  div button.secondary {
    background-color: var(--secondary);
    color: var(--background);
  }
  div.gradient {
    border:none;
    background-image: conic-gradient(from 90deg, #ff4800, #dfd902, #20dc68, #0092f4, #da54d8, #ff4800);
    width:200px;
    height:200px;
  }
.pparchment-and-ink_0 {
  --background:   #f1e2be;  /* Lc    0.00  H 42  S64  L84 */
  --text:         #594a45;  /* Lc   72.57  H 15  S12  L30 */
  --accent:       #000000;  /* Lc   89.55  HNaN  S 0  L 0 */
  --primary:      #445162;  /* Lc   71.49  H214  S18  L32 */
  --secondary:    #944431;  /* Lc   66.10  H 11  S50  L38 */
}
.pparchment-and-ink_1 {
  --background:   #f0d696;  /* Lc    0.00  H 42  S74  L76 */
  --text:         #594a45;  /* Lc   66.43  H 15  S12  L30 */
  --accent:       #000000;  /* Lc   83.41  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   83.41  HNaN  S 0  L 0 */
  --secondary:    #445162;  /* Lc   65.35  H214  S18  L32 */
}
.pparchment-and-ink_2 {
  --background:   #e6d1a1;  /* Lc    0.00  H 41  S57  L76 */
  --text:         #594a45;  /* Lc   63.35  H 15  S12  L30 */
  --accent:       #000000;  /* Lc   80.33  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   80.33  HNaN  S 0  L 0 */
  --secondary:    #445162;  /* Lc   62.27  H214  S18  L32 */
}
.pparchment-and-ink_3 {
  --background:   #d2bc76;  /* Lc    0.00  H 45  S50  L64 */
  --text:         #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
  --accent:       #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
  --secondary:    #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
}
.pparchment-and-ink_4 {
  --background:   #caac77;  /* Lc    0.00  H 38  S43  L62 */
  --text:         #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
  --accent:       #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
  --secondary:    #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
}
.pparchment-and-ink_5 {
  --background:   #886243;  /* Lc    0.00  H 26  S33  L39 */
  --text:         #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
  --accent:       #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
  --primary:      #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
  --secondary:    #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
}
.pparchment-and-ink_6 {
  --background:   #944431;  /* Lc    0.00  H 11  S50  L38 */
  --text:         #f1e2be;  /* Lc  -69.54  H 42  S64  L84 */
  --accent:       #f0d696;  /* Lc  -62.88  H 42  S74  L76 */
  --primary:      #f0d696;  /* Lc  -62.88  H 42  S74  L76 */
  --secondary:    #f1e2be;  /* Lc  -69.54  H 42  S64  L84 */
}
.pparchment-and-ink_7 {
  --background:   #445162;  /* Lc    0.00  H214  S18  L32 */
  --text:         #f0d696;  /* Lc  -67.87  H 42  S74  L76 */
  --accent:       #f1e2be;  /* Lc  -74.54  H 42  S64  L84 */
  --primary:      #f1e2be;  /* Lc  -74.54  H 42  S64  L84 */
  --secondary:    #e6d1a1;  /* Lc  -64.55  H 41  S57  L76 */
}
.pparchment-and-ink_8 {
  --background:   #594a45;  /* Lc    0.00  H 15  S12  L30 */
  --text:         #f0d696;  /* Lc  -68.86  H 42  S74  L76 */
  --accent:       #f1e2be;  /* Lc  -75.52  H 42  S64  L84 */
  --primary:      #f1e2be;  /* Lc  -75.52  H 42  S64  L84 */
  --secondary:    #e6d1a1;  /* Lc  -65.53  H 41  S57  L76 */
}
.pparchment-and-ink_9 {
  --background:   #000000;  /* Lc    0.00  HNaN  S 0  L 0 */
  --text:         #f0d696;  /* Lc  -83.12  H 42  S74  L76 */
  --accent:       #f1e2be;  /* Lc  -89.79  H 42  S64  L84 */
  --primary:      #e6d1a1;  /* Lc  -79.80  H 41  S57  L76 */
  --secondary:    #d2bc76;  /* Lc  -67.04  H 45  S50  L64 */
}
</style>

<div class="pparchment-and-ink_0">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #0</h3>
  <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#594a45">&#9632;</span>#594a45 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#445162">&#9632;</span>#445162 | <span style="color:#944431">&#9632;</span>#944431<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #f1e2be;  /* Lc    0.00  H 42  S64  L84 */
  --text:         #594a45;  /* Lc   72.57  H 15  S12  L30 */
  --accent:       #000000;  /* Lc   89.55  HNaN  S 0  L 0 */
  --primary:      #445162;  /* Lc   71.49  H214  S18  L32 */
  --secondary:    #944431;  /* Lc   66.10  H 11  S50  L38 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#f1e2be" stroke-width="3" fill="#f1e2be"/>
    <circle cx="111.00421827417925" cy="102.94857139990214" r="7" stroke="#f1e2be" stroke-width="3" fill="#594a45"/>
    <circle cx="100" cy="100" r="7" stroke="#f1e2be" stroke-width="3" fill="#000000"/>
    <circle cx="86.5156539403698" cy="90.90469373872882" r="7" stroke="#f1e2be" stroke-width="3" fill="#445162"/>
    <circle cx="144.31806631097564" cy="109.0288179020759" r="7" stroke="#f1e2be" stroke-width="3" fill="#944431"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_1">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #1</h3>
  <span style="color:#f0d696">&#9632;</span>#f0d696 | <span style="color:#594a45">&#9632;</span>#594a45 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#445162">&#9632;</span>#445162<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #f0d696;  /* Lc    0.00  H 42  S74  L76 */
  --text:         #594a45;  /* Lc   66.43  H 15  S12  L30 */
  --accent:       #000000;  /* Lc   83.41  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   83.41  HNaN  S 0  L 0 */
  --secondary:    #445162;  /* Lc   65.35  H214  S18  L32 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="149.6333580440384" cy="145.7469099423369" r="7" stroke="#f0d696" stroke-width="3" fill="#f0d696"/>
    <circle cx="111.00421827417925" cy="102.94857139990214" r="7" stroke="#f0d696" stroke-width="3" fill="#594a45"/>
    <circle cx="100" cy="100" r="7" stroke="#f0d696" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#f0d696" stroke-width="3" fill="#000000"/>
    <circle cx="86.5156539403698" cy="90.90469373872882" r="7" stroke="#f0d696" stroke-width="3" fill="#445162"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_2">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #2</h3>
  <span style="color:#e6d1a1">&#9632;</span>#e6d1a1 | <span style="color:#594a45">&#9632;</span>#594a45 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#445162">&#9632;</span>#445162<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #e6d1a1;  /* Lc    0.00  H 41  S57  L76 */
  --text:         #594a45;  /* Lc   63.35  H 15  S12  L30 */
  --accent:       #000000;  /* Lc   80.33  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   80.33  HNaN  S 0  L 0 */
  --secondary:    #445162;  /* Lc   62.27  H214  S18  L32 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="138.93950158919435" cy="134.74156422958913" r="7" stroke="#e6d1a1" stroke-width="3" fill="#e6d1a1"/>
    <circle cx="111.00421827417925" cy="102.94857139990214" r="7" stroke="#e6d1a1" stroke-width="3" fill="#594a45"/>
    <circle cx="100" cy="100" r="7" stroke="#e6d1a1" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#e6d1a1" stroke-width="3" fill="#000000"/>
    <circle cx="86.5156539403698" cy="90.90469373872882" r="7" stroke="#e6d1a1" stroke-width="3" fill="#445162"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_3">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #3</h3>
  <span style="color:#d2bc76">&#9632;</span>#d2bc76 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #d2bc76;  /* Lc    0.00  H 45  S50  L64 */
  --text:         #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
  --accent:       #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
  --secondary:    #000000;  /* Lc   68.40  HNaN  S 0  L 0 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="131.80122561112782" cy="132.53355313856355" r="7" stroke="#d2bc76" stroke-width="3" fill="#d2bc76"/>
    <circle cx="100" cy="100" r="7" stroke="#d2bc76" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#d2bc76" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#d2bc76" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#d2bc76" stroke-width="3" fill="#000000"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_4">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #4</h3>
  <span style="color:#caac77">&#9632;</span>#caac77 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#000000">&#9632;</span>#000000<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #caac77;  /* Lc    0.00  H 38  S43  L62 */
  --text:         #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
  --accent:       #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
  --primary:      #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
  --secondary:    #000000;  /* Lc   61.33  HNaN  S 0  L 0 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="131.01168481362748" cy="124.50320232734086" r="7" stroke="#caac77" stroke-width="3" fill="#caac77"/>
    <circle cx="100" cy="100" r="7" stroke="#caac77" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#caac77" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#caac77" stroke-width="3" fill="#000000"/>
    <circle cx="100" cy="100" r="7" stroke="#caac77" stroke-width="3" fill="#000000"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_5">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #5</h3>
  <span style="color:#886243">&#9632;</span>#886243 | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#f1e2be">&#9632;</span>#f1e2be<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #886243;  /* Lc    0.00  H 26  S33  L39 */
  --text:         #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
  --accent:       #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
  --primary:      #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
  --secondary:    #f1e2be;  /* Lc  -64.16  H 42  S64  L84 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="127.26743005782336" cy="113.86739617111989" r="7" stroke="#886243" stroke-width="3" fill="#886243"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#886243" stroke-width="3" fill="#f1e2be"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#886243" stroke-width="3" fill="#f1e2be"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#886243" stroke-width="3" fill="#f1e2be"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#886243" stroke-width="3" fill="#f1e2be"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_6">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #6</h3>
  <span style="color:#944431">&#9632;</span>#944431 | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#f0d696">&#9632;</span>#f0d696 | <span style="color:#f0d696">&#9632;</span>#f0d696 | <span style="color:#f1e2be">&#9632;</span>#f1e2be<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #944431;  /* Lc    0.00  H 11  S50  L38 */
  --text:         #f1e2be;  /* Lc  -69.54  H 42  S64  L84 */
  --accent:       #f0d696;  /* Lc  -62.88  H 42  S74  L76 */
  --primary:      #f0d696;  /* Lc  -62.88  H 42  S74  L76 */
  --secondary:    #f1e2be;  /* Lc  -69.54  H 42  S64  L84 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="144.31806631097564" cy="109.0288179020759" r="7" stroke="#944431" stroke-width="3" fill="#944431"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#944431" stroke-width="3" fill="#f1e2be"/>
    <circle cx="149.6333580440384" cy="145.7469099423369" r="7" stroke="#944431" stroke-width="3" fill="#f0d696"/>
    <circle cx="149.6333580440384" cy="145.7469099423369" r="7" stroke="#944431" stroke-width="3" fill="#f0d696"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#944431" stroke-width="3" fill="#f1e2be"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_7">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #7</h3>
  <span style="color:#445162">&#9632;</span>#445162 | <span style="color:#f0d696">&#9632;</span>#f0d696 | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#e6d1a1">&#9632;</span>#e6d1a1<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #445162;  /* Lc    0.00  H214  S18  L32 */
  --text:         #f0d696;  /* Lc  -67.87  H 42  S74  L76 */
  --accent:       #f1e2be;  /* Lc  -74.54  H 42  S64  L84 */
  --primary:      #f1e2be;  /* Lc  -74.54  H 42  S64  L84 */
  --secondary:    #e6d1a1;  /* Lc  -64.55  H 41  S57  L76 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="86.5156539403698" cy="90.90469373872882" r="7" stroke="#445162" stroke-width="3" fill="#445162"/>
    <circle cx="149.6333580440384" cy="145.7469099423369" r="7" stroke="#445162" stroke-width="3" fill="#f0d696"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#445162" stroke-width="3" fill="#f1e2be"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#445162" stroke-width="3" fill="#f1e2be"/>
    <circle cx="138.93950158919435" cy="134.74156422958913" r="7" stroke="#445162" stroke-width="3" fill="#e6d1a1"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_8">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #8</h3>
  <span style="color:#594a45">&#9632;</span>#594a45 | <span style="color:#f0d696">&#9632;</span>#f0d696 | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#e6d1a1">&#9632;</span>#e6d1a1<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #594a45;  /* Lc    0.00  H 15  S12  L30 */
  --text:         #f0d696;  /* Lc  -68.86  H 42  S74  L76 */
  --accent:       #f1e2be;  /* Lc  -75.52  H 42  S64  L84 */
  --primary:      #f1e2be;  /* Lc  -75.52  H 42  S64  L84 */
  --secondary:    #e6d1a1;  /* Lc  -65.53  H 41  S57  L76 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="111.00421827417925" cy="102.94857139990214" r="7" stroke="#594a45" stroke-width="3" fill="#594a45"/>
    <circle cx="149.6333580440384" cy="145.7469099423369" r="7" stroke="#594a45" stroke-width="3" fill="#f0d696"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#594a45" stroke-width="3" fill="#f1e2be"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#594a45" stroke-width="3" fill="#f1e2be"/>
    <circle cx="138.93950158919435" cy="134.74156422958913" r="7" stroke="#594a45" stroke-width="3" fill="#e6d1a1"/>

  </svg>
</div>
<hr/>
<div class="pparchment-and-ink_9">
  <h3><span class="icon">&#9632;</span>Palette parchment-and-ink #9</h3>
  <span style="color:#000000">&#9632;</span>#000000 | <span style="color:#f0d696">&#9632;</span>#f0d696 | <span style="color:#f1e2be">&#9632;</span>#f1e2be | <span style="color:#e6d1a1">&#9632;</span>#e6d1a1 | <span style="color:#d2bc76">&#9632;</span>#d2bc76<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #000000;  /* Lc    0.00  HNaN  S 0  L 0 */
  --text:         #f0d696;  /* Lc  -83.12  H 42  S74  L76 */
  --accent:       #f1e2be;  /* Lc  -89.79  H 42  S64  L84 */
  --primary:      #e6d1a1;  /* Lc  -79.80  H 41  S57  L76 */
  --secondary:    #d2bc76;  /* Lc  -67.04  H 45  S50  L64 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="100" cy="100" r="7" stroke="#000000" stroke-width="3" fill="#000000"/>
    <circle cx="149.6333580440384" cy="145.7469099423369" r="7" stroke="#000000" stroke-width="3" fill="#f0d696"/>
    <circle cx="142.9373535448459" cy="139.1425696751607" r="7" stroke="#000000" stroke-width="3" fill="#f1e2be"/>
    <circle cx="138.93950158919435" cy="134.74156422958913" r="7" stroke="#000000" stroke-width="3" fill="#e6d1a1"/>
    <circle cx="131.80122561112782" cy="132.53355313856355" r="7" stroke="#000000" stroke-width="3" fill="#d2bc76"/>

  </svg>
</div>
<hr/>
