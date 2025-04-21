# Palette shido-cyberneon

<span style="color:#00033c">&#9632;</span>#00033c

<span style="color:#005260">&#9632;</span>#005260

<span style="color:#009d4a">&#9632;</span>#009d4a

<span style="color:#0aff52">&#9632;</span>#0aff52

<span style="color:#003884">&#9632;</span>#003884

<span style="color:#008ac5">&#9632;</span>#008ac5

<span style="color:#00f7ff">&#9632;</span>#00f7ff

<span style="color:#ff5cff">&#9632;</span>#ff5cff

<span style="color:#ac29ce">&#9632;</span>#ac29ce

<span style="color:#600088">&#9632;</span>#600088

<span style="color:#b10585">&#9632;</span>#b10585

<span style="color:#ff004e">&#9632;</span>#ff004e

<span style="color:#2a2e79">&#9632;</span>#2a2e79

<span style="color:#4e6ea8">&#9632;</span>#4e6ea8

<span style="color:#add4fa">&#9632;</span>#add4fa

<span style="color:#ffffff">&#9632;</span>#ffffff

## APCA Lc Background (X) vs Foreground (Y)

|         | #ffffff | #00f7ff | #0aff52 | #add4fa | #009d4a | #ff004e | #008ac5 | #ac29ce | #4e6ea8 | #b10585 | #005260 | #600088 | #003884 | #2a2e79 | #00033c |
| ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: |
| #00033c |  105.04 |   86.96 |   85.88 |   77.61 |         |         |         |         |         |         |         |         |         |         |         |
| #2a2e79 |   96.87 |   78.79 |   77.72 |   69.45 |         |         |         |         |         |         |         |         |         |         |         |
| #003884 |    94.8 |   76.72 |   75.64 |   67.37 |         |         |         |         |         |         |         |         |         |         |         |
| #600088 |   94.06 |   75.98 |    74.9 |   66.63 |         |         |         |         |         |         |         |         |         |         |         |
| #005260 |   89.72 |   71.64 |   70.57 |    62.3 |         |         |         |         |         |         |         |         |         |         |         |
| #b10585 |   79.96 |   61.88 |   60.81 |         |         |         |         |         |         |         |         |         |         |         |         |
| #4e6ea8 |   75.05 |         |         |         |         |         |         |         |         |         |         |         |         |         |         |
| #ac29ce |   74.92 |         |         |         |         |         |         |         |         |         |         |         |         |         |         |
| #008ac5 |    65.4 |         |         |         |         |         |         |         |         |         |         |         |         |         |         |
| #ff004e |   63.59 |         |         |         |         |         |         |         |         |         |         |         |         |         |         |
| #009d4a |   62.34 |         |         |         |         |         |         |         |         |         |         |         |         |         |         |
| #add4fa |         |         |         |         |         |         |         |         |         |         |  -64.29 |  -68.14 |  -68.78 |  -70.57 |   -77.2 |
| #0aff52 |         |         |         |         |         |         |         |         |         |  -64.16 |  -73.22 |  -77.07 |  -77.72 |  -79.51 |  -86.13 |
| #00f7ff |         |         |         |         |         |         |         |  -60.48 |   -60.6 |  -65.33 |  -74.39 |  -78.25 |  -78.89 |  -80.68 |   -87.3 |
| #ffffff |         |         |         |         |  -67.82 |  -69.09 |  -70.91 |  -80.32 |  -80.44 |  -85.17 |  -94.23 |  -98.08 |  -98.73 | -100.51 | -107.14 |

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
.pshido-cyberneon_0 {
  --background:   #ffffff;  /* Lc    0.00  HNaN  S 0  L100 */
  --text:         #2a2e79;  /* Lc   96.87  H236  S48  L31 */
  --accent:       #00033c;  /* Lc  105.04  H237  S99  L11 */
  --primary:      #003884;  /* Lc   94.80  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   94.06  H282  S100  L26 */
}
.pshido-cyberneon_1 {
  --background:   #00f7ff;  /* Lc    0.00  H181  S100  L50 */
  --text:         #2a2e79;  /* Lc   78.79  H236  S48  L31 */
  --accent:       #00033c;  /* Lc   86.96  H237  S99  L11 */
  --primary:      #003884;  /* Lc   76.72  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   75.98  H282  S100  L26 */
}
.pshido-cyberneon_2 {
  --background:   #0aff52;  /* Lc    0.00  H137  S100  L51 */
  --text:         #2a2e79;  /* Lc   77.72  H236  S48  L31 */
  --accent:       #00033c;  /* Lc   85.88  H237  S99  L11 */
  --primary:      #003884;  /* Lc   75.64  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   74.90  H282  S100  L26 */
}
.pshido-cyberneon_3 {
  --background:   #add4fa;  /* Lc    0.00  H209  S88  L82 */
  --text:         #2a2e79;  /* Lc   69.45  H236  S48  L31 */
  --accent:       #00033c;  /* Lc   77.61  H237  S99  L11 */
  --primary:      #003884;  /* Lc   67.37  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   66.63  H282  S100  L26 */
}
.pshido-cyberneon_4 {
  --background:   #009d4a;  /* Lc    0.00  H148  S100  L30 */
  --text:         #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
}
.pshido-cyberneon_5 {
  --background:   #ff004e;  /* Lc    0.00  H341  S100  L50 */
  --text:         #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
}
.pshido-cyberneon_6 {
  --background:   #008ac5;  /* Lc    0.00  H197  S100  L38 */
  --text:         #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
}
.pshido-cyberneon_7 {
  --background:   #ac29ce;  /* Lc    0.00  H287  S66  L48 */
  --text:         #ffffff;  /* Lc  -80.32  HNaN  S 0  L100 */
  --accent:       #00f7ff;  /* Lc  -60.48  H181  S100  L50 */
  --primary:      #00f7ff;  /* Lc  -60.48  H181  S100  L50 */
  --secondary:    #ffffff;  /* Lc  -80.32  HNaN  S 0  L100 */
}
.pshido-cyberneon_8 {
  --background:   #4e6ea8;  /* Lc    0.00  H218  S36  L48 */
  --text:         #ffffff;  /* Lc  -80.44  HNaN  S 0  L100 */
  --accent:       #00f7ff;  /* Lc  -60.60  H181  S100  L50 */
  --primary:      #00f7ff;  /* Lc  -60.60  H181  S100  L50 */
  --secondary:    #ffffff;  /* Lc  -80.44  HNaN  S 0  L100 */
}
.pshido-cyberneon_9 {
  --background:   #b10585;  /* Lc    0.00  H315  S94  L35 */
  --text:         #00f7ff;  /* Lc  -65.33  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -85.17  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -85.17  HNaN  S 0  L100 */
  --secondary:    #0aff52;  /* Lc  -64.16  H137  S100  L51 */
}
.pshido-cyberneon_10 {
  --background:   #005260;  /* Lc    0.00  H188  S100  L18 */
  --text:         #00f7ff;  /* Lc  -74.39  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -94.23  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -73.22  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -64.29  H209  S88  L82 */
}
.pshido-cyberneon_11 {
  --background:   #600088;  /* Lc    0.00  H282  S100  L26 */
  --text:         #00f7ff;  /* Lc  -78.25  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -98.08  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -77.07  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -68.14  H209  S88  L82 */
}
.pshido-cyberneon_12 {
  --background:   #003884;  /* Lc    0.00  H214  S100  L25 */
  --text:         #00f7ff;  /* Lc  -78.89  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -98.73  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -77.72  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -68.78  H209  S88  L82 */
}
.pshido-cyberneon_13 {
  --background:   #2a2e79;  /* Lc    0.00  H236  S48  L31 */
  --text:         #00f7ff;  /* Lc  -80.68  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc -100.51  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -79.51  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -70.57  H209  S88  L82 */
}
.pshido-cyberneon_14 {
  --background:   #00033c;  /* Lc    0.00  H237  S99  L11 */
  --text:         #00f7ff;  /* Lc  -87.30  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc -107.14  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -86.13  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -77.20  H209  S88  L82 */
}
</style>

<div class="pshido-cyberneon_0">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #0</h3>
  <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#2a2e79">&#9632;</span>#2a2e79 | <span style="color:#00033c">&#9632;</span>#00033c | <span style="color:#003884">&#9632;</span>#003884 | <span style="color:#600088">&#9632;</span>#600088<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ffffff;  /* Lc    0.00  HNaN  S 0  L100 */
  --text:         #2a2e79;  /* Lc   96.87  H236  S48  L31 */
  --accent:       #00033c;  /* Lc  105.04  H237  S99  L11 */
  --primary:      #003884;  /* Lc   94.80  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   94.06  H282  S100  L26 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="100" cy="100" r="7" stroke="#ffffff" stroke-width="3" fill="#ffffff"/>
    <circle cx="76.21880472345663" cy="63.433252284746835" r="7" stroke="#ffffff" stroke-width="3" fill="#2a2e79"/>
    <circle cx="50.98248684864758" cy="24.51964888491186" r="7" stroke="#ffffff" stroke-width="3" fill="#00033c"/>
    <circle cx="25.86910767131502" cy="48.964612252350676" r="7" stroke="#ffffff" stroke-width="3" fill="#003884"/>
    <circle cx="119.25397748858478" cy="12.083651401635933" r="7" stroke="#ffffff" stroke-width="3" fill="#600088"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_1">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #1</h3>
  <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#2a2e79">&#9632;</span>#2a2e79 | <span style="color:#00033c">&#9632;</span>#00033c | <span style="color:#003884">&#9632;</span>#003884 | <span style="color:#600088">&#9632;</span>#600088<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #00f7ff;  /* Lc    0.00  H181  S100  L50 */
  --text:         #2a2e79;  /* Lc   78.79  H236  S48  L31 */
  --accent:       #00033c;  /* Lc   86.96  H237  S99  L11 */
  --primary:      #003884;  /* Lc   76.72  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   75.98  H282  S100  L26 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#00f7ff" stroke-width="3" fill="#00f7ff"/>
    <circle cx="76.21880472345663" cy="63.433252284746835" r="7" stroke="#00f7ff" stroke-width="3" fill="#2a2e79"/>
    <circle cx="50.98248684864758" cy="24.51964888491186" r="7" stroke="#00f7ff" stroke-width="3" fill="#00033c"/>
    <circle cx="25.86910767131502" cy="48.964612252350676" r="7" stroke="#00f7ff" stroke-width="3" fill="#003884"/>
    <circle cx="119.25397748858478" cy="12.083651401635933" r="7" stroke="#00f7ff" stroke-width="3" fill="#600088"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_2">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #2</h3>
  <span style="color:#0aff52">&#9632;</span>#0aff52 | <span style="color:#2a2e79">&#9632;</span>#2a2e79 | <span style="color:#00033c">&#9632;</span>#00033c | <span style="color:#003884">&#9632;</span>#003884 | <span style="color:#600088">&#9632;</span>#600088<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #0aff52;  /* Lc    0.00  H137  S100  L51 */
  --text:         #2a2e79;  /* Lc   77.72  H236  S48  L31 */
  --accent:       #00033c;  /* Lc   85.88  H237  S99  L11 */
  --primary:      #003884;  /* Lc   75.64  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   74.90  H282  S100  L26 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#0aff52" stroke-width="3" fill="#0aff52"/>
    <circle cx="76.21880472345663" cy="63.433252284746835" r="7" stroke="#0aff52" stroke-width="3" fill="#2a2e79"/>
    <circle cx="50.98248684864758" cy="24.51964888491186" r="7" stroke="#0aff52" stroke-width="3" fill="#00033c"/>
    <circle cx="25.86910767131502" cy="48.964612252350676" r="7" stroke="#0aff52" stroke-width="3" fill="#003884"/>
    <circle cx="119.25397748858478" cy="12.083651401635933" r="7" stroke="#0aff52" stroke-width="3" fill="#600088"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_3">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #3</h3>
  <span style="color:#add4fa">&#9632;</span>#add4fa | <span style="color:#2a2e79">&#9632;</span>#2a2e79 | <span style="color:#00033c">&#9632;</span>#00033c | <span style="color:#003884">&#9632;</span>#003884 | <span style="color:#600088">&#9632;</span>#600088<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #add4fa;  /* Lc    0.00  H209  S88  L82 */
  --text:         #2a2e79;  /* Lc   69.45  H236  S48  L31 */
  --accent:       #00033c;  /* Lc   77.61  H237  S99  L11 */
  --primary:      #003884;  /* Lc   67.37  H214  S100  L25 */
  --secondary:    #600088;  /* Lc   66.63  H282  S100  L26 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="30.74736716375783" cy="60.6424170264518" r="7" stroke="#add4fa" stroke-width="3" fill="#add4fa"/>
    <circle cx="76.21880472345663" cy="63.433252284746835" r="7" stroke="#add4fa" stroke-width="3" fill="#2a2e79"/>
    <circle cx="50.98248684864758" cy="24.51964888491186" r="7" stroke="#add4fa" stroke-width="3" fill="#00033c"/>
    <circle cx="25.86910767131502" cy="48.964612252350676" r="7" stroke="#add4fa" stroke-width="3" fill="#003884"/>
    <circle cx="119.25397748858478" cy="12.083651401635933" r="7" stroke="#add4fa" stroke-width="3" fill="#600088"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_4">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #4</h3>
  <span style="color:#009d4a">&#9632;</span>#009d4a | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #009d4a;  /* Lc    0.00  H148  S100  L30 */
  --text:         #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -67.82  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="23.44330258202345" cy="147.31883430994873" r="7" stroke="#009d4a" stroke-width="3" fill="#009d4a"/>
    <circle cx="100" cy="100" r="7" stroke="#009d4a" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#009d4a" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#009d4a" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#009d4a" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_5">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #5</h3>
  <span style="color:#ff004e">&#9632;</span>#ff004e | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ff004e;  /* Lc    0.00  H341  S100  L50 */
  --text:         #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -69.09  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="185.42214496323112" cy="71.66173699958428" r="7" stroke="#ff004e" stroke-width="3" fill="#ff004e"/>
    <circle cx="100" cy="100" r="7" stroke="#ff004e" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#ff004e" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#ff004e" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#ff004e" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_6">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #6</h3>
  <span style="color:#008ac5">&#9632;</span>#008ac5 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #008ac5;  /* Lc    0.00  H197  S100  L38 */
  --text:         #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -70.91  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="14.390141787002236" cy="72.23397441565648" r="7" stroke="#008ac5" stroke-width="3" fill="#008ac5"/>
    <circle cx="100" cy="100" r="7" stroke="#008ac5" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#008ac5" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#008ac5" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#008ac5" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_7">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #7</h3>
  <span style="color:#ac29ce">&#9632;</span>#ac29ce | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ac29ce;  /* Lc    0.00  H287  S66  L48 */
  --text:         #ffffff;  /* Lc  -80.32  HNaN  S 0  L100 */
  --accent:       #00f7ff;  /* Lc  -60.48  H181  S100  L50 */
  --primary:      #00f7ff;  /* Lc  -60.48  H181  S100  L50 */
  --secondary:    #ffffff;  /* Lc  -80.32  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="118.21528576159774" cy="42.70433685408111" r="7" stroke="#ac29ce" stroke-width="3" fill="#ac29ce"/>
    <circle cx="100" cy="100" r="7" stroke="#ac29ce" stroke-width="3" fill="#ffffff"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#ac29ce" stroke-width="3" fill="#00f7ff"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#ac29ce" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#ac29ce" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_8">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #8</h3>
  <span style="color:#4e6ea8">&#9632;</span>#4e6ea8 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #4e6ea8;  /* Lc    0.00  H218  S36  L48 */
  --text:         #ffffff;  /* Lc  -80.44  HNaN  S 0  L100 */
  --accent:       #00f7ff;  /* Lc  -60.60  H181  S100  L50 */
  --primary:      #00f7ff;  /* Lc  -60.60  H181  S100  L50 */
  --secondary:    #ffffff;  /* Lc  -80.44  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="74.29092838991488" cy="79.42769525282083" r="7" stroke="#4e6ea8" stroke-width="3" fill="#4e6ea8"/>
    <circle cx="100" cy="100" r="7" stroke="#4e6ea8" stroke-width="3" fill="#ffffff"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#4e6ea8" stroke-width="3" fill="#00f7ff"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#4e6ea8" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#4e6ea8" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_9">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #9</h3>
  <span style="color:#b10585">&#9632;</span>#b10585 | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#0aff52">&#9632;</span>#0aff52<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #b10585;  /* Lc    0.00  H315  S94  L35 */
  --text:         #00f7ff;  /* Lc  -65.33  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -85.17  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -85.17  HNaN  S 0  L100 */
  --secondary:    #0aff52;  /* Lc  -64.16  H137  S100  L51 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="160.50798314167685" cy="40.22435567535663" r="7" stroke="#b10585" stroke-width="3" fill="#b10585"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#b10585" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#b10585" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#b10585" stroke-width="3" fill="#ffffff"/>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#b10585" stroke-width="3" fill="#0aff52"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_10">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #10</h3>
  <span style="color:#005260">&#9632;</span>#005260 | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#0aff52">&#9632;</span>#0aff52 | <span style="color:#add4fa">&#9632;</span>#add4fa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #005260;  /* Lc    0.00  H188  S100  L18 */
  --text:         #00f7ff;  /* Lc  -74.39  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -94.23  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -73.22  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -64.29  H209  S88  L82 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="11.047464057901536" cy="86.30889524290752" r="7" stroke="#005260" stroke-width="3" fill="#005260"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#005260" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#005260" stroke-width="3" fill="#ffffff"/>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#005260" stroke-width="3" fill="#0aff52"/>
    <circle cx="30.74736716375783" cy="60.6424170264518" r="7" stroke="#005260" stroke-width="3" fill="#add4fa"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_11">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #11</h3>
  <span style="color:#600088">&#9632;</span>#600088 | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#0aff52">&#9632;</span>#0aff52 | <span style="color:#add4fa">&#9632;</span>#add4fa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #600088;  /* Lc    0.00  H282  S100  L26 */
  --text:         #00f7ff;  /* Lc  -78.25  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -98.08  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -77.07  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -68.14  H209  S88  L82 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="119.25397748858478" cy="12.083651401635933" r="7" stroke="#600088" stroke-width="3" fill="#600088"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#600088" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#600088" stroke-width="3" fill="#ffffff"/>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#600088" stroke-width="3" fill="#0aff52"/>
    <circle cx="30.74736716375783" cy="60.6424170264518" r="7" stroke="#600088" stroke-width="3" fill="#add4fa"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_12">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #12</h3>
  <span style="color:#003884">&#9632;</span>#003884 | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#0aff52">&#9632;</span>#0aff52 | <span style="color:#add4fa">&#9632;</span>#add4fa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #003884;  /* Lc    0.00  H214  S100  L25 */
  --text:         #00f7ff;  /* Lc  -78.89  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc  -98.73  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -77.72  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -68.78  H209  S88  L82 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="25.86910767131502" cy="48.964612252350676" r="7" stroke="#003884" stroke-width="3" fill="#003884"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#003884" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#003884" stroke-width="3" fill="#ffffff"/>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#003884" stroke-width="3" fill="#0aff52"/>
    <circle cx="30.74736716375783" cy="60.6424170264518" r="7" stroke="#003884" stroke-width="3" fill="#add4fa"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_13">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #13</h3>
  <span style="color:#2a2e79">&#9632;</span>#2a2e79 | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#0aff52">&#9632;</span>#0aff52 | <span style="color:#add4fa">&#9632;</span>#add4fa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #2a2e79;  /* Lc    0.00  H236  S48  L31 */
  --text:         #00f7ff;  /* Lc  -80.68  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc -100.51  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -79.51  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -70.57  H209  S88  L82 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="76.21880472345663" cy="63.433252284746835" r="7" stroke="#2a2e79" stroke-width="3" fill="#2a2e79"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#2a2e79" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#2a2e79" stroke-width="3" fill="#ffffff"/>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#2a2e79" stroke-width="3" fill="#0aff52"/>
    <circle cx="30.74736716375783" cy="60.6424170264518" r="7" stroke="#2a2e79" stroke-width="3" fill="#add4fa"/>

  </svg>
</div>
<hr/>
<div class="pshido-cyberneon_14">
  <h3><span class="icon">&#9632;</span>Palette shido-cyberneon #14</h3>
  <span style="color:#00033c">&#9632;</span>#00033c | <span style="color:#00f7ff">&#9632;</span>#00f7ff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#0aff52">&#9632;</span>#0aff52 | <span style="color:#add4fa">&#9632;</span>#add4fa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #00033c;  /* Lc    0.00  H237  S99  L11 */
  --text:         #00f7ff;  /* Lc  -87.30  H181  S100  L50 */
  --accent:       #ffffff;  /* Lc -107.14  HNaN  S 0  L100 */
  --primary:      #0aff52;  /* Lc  -86.13  H137  S100  L51 */
  --secondary:    #add4fa;  /* Lc  -77.20  H209  S88  L82 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="50.98248684864758" cy="24.51964888491186" r="7" stroke="#00033c" stroke-width="3" fill="#00033c"/>
    <circle cx="10.048565772373664" cy="97.04373878132974" r="7" stroke="#00033c" stroke-width="3" fill="#00f7ff"/>
    <circle cx="100" cy="100" r="7" stroke="#00033c" stroke-width="3" fill="#ffffff"/>
    <circle cx="33.50444428659908" cy="160.64932868850238" r="7" stroke="#00033c" stroke-width="3" fill="#0aff52"/>
    <circle cx="30.74736716375783" cy="60.6424170264518" r="7" stroke="#00033c" stroke-width="3" fill="#add4fa"/>

  </svg>
</div>
<hr/>
