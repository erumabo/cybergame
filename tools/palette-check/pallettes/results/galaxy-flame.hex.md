# Palette galaxy-flame

<span style="color:#699fad">&#9632;</span>#699fad

<span style="color:#3a708e">&#9632;</span>#3a708e

<span style="color:#2b454f">&#9632;</span>#2b454f

<span style="color:#111215">&#9632;</span>#111215

<span style="color:#151d1a">&#9632;</span>#151d1a

<span style="color:#1d3230">&#9632;</span>#1d3230

<span style="color:#314e3f">&#9632;</span>#314e3f

<span style="color:#4f5d42">&#9632;</span>#4f5d42

<span style="color:#9a9f87">&#9632;</span>#9a9f87

<span style="color:#ede6cb">&#9632;</span>#ede6cb

<span style="color:#f5d893">&#9632;</span>#f5d893

<span style="color:#e8b26f">&#9632;</span>#e8b26f

<span style="color:#b6834c">&#9632;</span>#b6834c

<span style="color:#704d2b">&#9632;</span>#704d2b

<span style="color:#40231e">&#9632;</span>#40231e

<span style="color:#151015">&#9632;</span>#151015

## APCA Lc Background (X) vs Foreground (Y)

|         | #ede6cb | #f5d893 | #e8b26f | #3a708e | #4f5d42 | #704d2b | #314e3f | #2b454f | #1d3230 | #40231e | #151d1a | #111215 | #151015 |
| ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: |
| #151015 |   90.38 |   84.11 |   66.98 |         |         |         |         |         |         |         |         |         |         |
| #111215 |   90.34 |   84.07 |   66.94 |         |         |         |         |         |         |         |         |         |         |
| #151d1a |   89.14 |   82.86 |   65.73 |         |         |         |         |         |         |         |         |         |         |
| #40231e |   85.87 |   79.59 |   62.46 |         |         |         |         |         |         |         |         |         |         |
| #1d3230 |   85.06 |   78.78 |   61.65 |         |         |         |         |         |         |         |         |         |         |
| #2b454f |   78.61 |   72.33 |         |         |         |         |         |         |         |         |         |         |         |
| #314e3f |   76.13 |   69.85 |         |         |         |         |         |         |         |         |         |         |         |
| #704d2b |   71.15 |   64.88 |         |         |         |         |         |         |         |         |         |         |         |
| #4f5d42 |   69.52 |   63.25 |         |         |         |         |         |         |         |         |         |         |         |
| #3a708e |   61.84 |         |         |         |         |         |         |         |         |         |         |         |         |
| #e8b26f |         |         |         |         |         |         |         |         |  -61.55 |  -62.21 |  -64.82 |  -65.74 |  -65.77 |
| #f5d893 |         |         |         |         |  -66.17 |  -67.68 |   -72.2 |   -74.4 |   -79.9 |  -80.57 |  -83.17 |  -84.09 |  -84.12 |
| #ede6cb |         |         |         |   -65.7 |  -72.99 |   -74.5 |  -79.02 |  -81.22 |  -86.72 |  -87.39 |  -89.99 |  -90.91 |  -90.94 |

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
.pgalaxy-flame_0 {
  --background:   #ede6cb;  /* Lc    0.00  H 47  S48  L86 */
  --text:         #111215;  /* Lc   90.34  H225  S10  L 7 */
  --accent:       #151015;  /* Lc   90.38  H300  S13  L 7 */
  --primary:      #151d1a;  /* Lc   89.14  H157  S16  L 9 */
  --secondary:    #40231e;  /* Lc   85.87  H  8  S36  L18 */
}
.pgalaxy-flame_1 {
  --background:   #f5d893;  /* Lc    0.00  H 42  S83  L76 */
  --text:         #111215;  /* Lc   84.07  H225  S10  L 7 */
  --accent:       #151015;  /* Lc   84.11  H300  S13  L 7 */
  --primary:      #151d1a;  /* Lc   82.86  H157  S16  L 9 */
  --secondary:    #40231e;  /* Lc   79.59  H  8  S36  L18 */
}
.pgalaxy-flame_2 {
  --background:   #e8b26f;  /* Lc    0.00  H 33  S72  L67 */
  --text:         #111215;  /* Lc   66.94  H225  S10  L 7 */
  --accent:       #151015;  /* Lc   66.98  H300  S13  L 7 */
  --primary:      #151d1a;  /* Lc   65.73  H157  S16  L 9 */
  --secondary:    #40231e;  /* Lc   62.46  H  8  S36  L18 */
}
.pgalaxy-flame_3 {
  --background:   #3a708e;  /* Lc    0.00  H201  S42  L39 */
  --text:         #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
  --accent:       #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
  --secondary:    #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
}
.pgalaxy-flame_4 {
  --background:   #4f5d42;  /* Lc    0.00  H 91  S16  L31 */
  --text:         #ede6cb;  /* Lc  -72.99  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -66.17  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -66.17  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -72.99  H 47  S48  L86 */
}
.pgalaxy-flame_5 {
  --background:   #704d2b;  /* Lc    0.00  H 29  S44  L30 */
  --text:         #ede6cb;  /* Lc  -74.50  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -67.68  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -67.68  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -74.50  H 47  S48  L86 */
}
.pgalaxy-flame_6 {
  --background:   #314e3f;  /* Lc    0.00  H148  S22  L24 */
  --text:         #ede6cb;  /* Lc  -79.02  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -72.20  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -72.20  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -79.02  H 47  S48  L86 */
}
.pgalaxy-flame_7 {
  --background:   #2b454f;  /* Lc    0.00  H196  S29  L23 */
  --text:         #ede6cb;  /* Lc  -81.22  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -74.40  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -74.40  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -81.22  H 47  S48  L86 */
}
.pgalaxy-flame_8 {
  --background:   #1d3230;  /* Lc    0.00  H174  S26  L15 */
  --text:         #f5d893;  /* Lc  -79.90  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -86.72  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -86.72  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -61.55  H 33  S72  L67 */
}
.pgalaxy-flame_9 {
  --background:   #40231e;  /* Lc    0.00  H  8  S36  L18 */
  --text:         #f5d893;  /* Lc  -80.57  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -87.39  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -87.39  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -62.21  H 33  S72  L67 */
}
.pgalaxy-flame_10 {
  --background:   #151d1a;  /* Lc    0.00  H157  S16  L 9 */
  --text:         #f5d893;  /* Lc  -83.17  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -89.99  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -89.99  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -64.82  H 33  S72  L67 */
}
.pgalaxy-flame_11 {
  --background:   #111215;  /* Lc    0.00  H225  S10  L 7 */
  --text:         #f5d893;  /* Lc  -84.09  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -90.91  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -90.91  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -65.74  H 33  S72  L67 */
}
.pgalaxy-flame_12 {
  --background:   #151015;  /* Lc    0.00  H300  S13  L 7 */
  --text:         #f5d893;  /* Lc  -84.12  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -90.94  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -90.94  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -65.77  H 33  S72  L67 */
}
</style>

<div class="pgalaxy-flame_0">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #0</h3>
  <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#111215">&#9632;</span>#111215 | <span style="color:#151015">&#9632;</span>#151015 | <span style="color:#151d1a">&#9632;</span>#151d1a | <span style="color:#40231e">&#9632;</span>#40231e<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ede6cb;  /* Lc    0.00  H 47  S48  L86 */
  --text:         #111215;  /* Lc   90.34  H225  S10  L 7 */
  --accent:       #151015;  /* Lc   90.38  H300  S13  L 7 */
  --primary:      #151d1a;  /* Lc   89.14  H157  S16  L 9 */
  --secondary:    #40231e;  /* Lc   85.87  H  8  S36  L18 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#ede6cb" stroke-width="3" fill="#ede6cb"/>
    <circle cx="93.30109365191691" cy="93.30109365191691" r="7" stroke="#ede6cb" stroke-width="3" fill="#111215"/>
    <circle cx="106.08108108108108" cy="89.46725860262168" r="7" stroke="#ede6cb" stroke-width="3" fill="#151015"/>
    <circle cx="86.69613473183747" cy="105.51064142605729" r="7" stroke="#ede6cb" stroke-width="3" fill="#151d1a"/>
    <circle cx="132.16793983583673" cy="104.99338791413594" r="7" stroke="#ede6cb" stroke-width="3" fill="#40231e"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_1">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #1</h3>
  <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#111215">&#9632;</span>#111215 | <span style="color:#151015">&#9632;</span>#151015 | <span style="color:#151d1a">&#9632;</span>#151d1a | <span style="color:#40231e">&#9632;</span>#40231e<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #f5d893;  /* Lc    0.00  H 42  S83  L76 */
  --text:         #111215;  /* Lc   84.07  H225  S10  L 7 */
  --accent:       #151015;  /* Lc   84.11  H300  S13  L 7 */
  --primary:      #151d1a;  /* Lc   82.86  H157  S16  L 9 */
  --secondary:    #40231e;  /* Lc   79.59  H  8  S36  L18 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#f5d893" stroke-width="3" fill="#f5d893"/>
    <circle cx="93.30109365191691" cy="93.30109365191691" r="7" stroke="#f5d893" stroke-width="3" fill="#111215"/>
    <circle cx="106.08108108108108" cy="89.46725860262168" r="7" stroke="#f5d893" stroke-width="3" fill="#151015"/>
    <circle cx="86.69613473183747" cy="105.51064142605729" r="7" stroke="#f5d893" stroke-width="3" fill="#151d1a"/>
    <circle cx="132.16793983583673" cy="104.99338791413594" r="7" stroke="#f5d893" stroke-width="3" fill="#40231e"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_2">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #2</h3>
  <span style="color:#e8b26f">&#9632;</span>#e8b26f | <span style="color:#111215">&#9632;</span>#111215 | <span style="color:#151015">&#9632;</span>#151015 | <span style="color:#151d1a">&#9632;</span>#151d1a | <span style="color:#40231e">&#9632;</span>#40231e<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #e8b26f;  /* Lc    0.00  H 33  S72  L67 */
  --text:         #111215;  /* Lc   66.94  H225  S10  L 7 */
  --accent:       #151015;  /* Lc   66.98  H300  S13  L 7 */
  --primary:      #151d1a;  /* Lc   65.73  H157  S16  L 9 */
  --secondary:    #40231e;  /* Lc   62.46  H  8  S36  L18 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="154.5506246802458" cy="135.7284029884459" r="7" stroke="#e8b26f" stroke-width="3" fill="#e8b26f"/>
    <circle cx="93.30109365191691" cy="93.30109365191691" r="7" stroke="#e8b26f" stroke-width="3" fill="#111215"/>
    <circle cx="106.08108108108108" cy="89.46725860262168" r="7" stroke="#e8b26f" stroke-width="3" fill="#151015"/>
    <circle cx="86.69613473183747" cy="105.51064142605729" r="7" stroke="#e8b26f" stroke-width="3" fill="#151d1a"/>
    <circle cx="132.16793983583673" cy="104.99338791413594" r="7" stroke="#e8b26f" stroke-width="3" fill="#40231e"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_3">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #3</h3>
  <span style="color:#3a708e">&#9632;</span>#3a708e | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #3a708e;  /* Lc    0.00  H201  S42  L39 */
  --text:         #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
  --accent:       #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
  --secondary:    #ede6cb;  /* Lc  -65.70  H 47  S48  L86 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="64.81297230124908" cy="86.19010927895025" r="7" stroke="#3a708e" stroke-width="3" fill="#3a708e"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#3a708e" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#3a708e" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#3a708e" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#3a708e" stroke-width="3" fill="#ede6cb"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_4">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #4</h3>
  <span style="color:#4f5d42">&#9632;</span>#4f5d42 | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #4f5d42;  /* Lc    0.00  H 91  S16  L31 */
  --text:         #ede6cb;  /* Lc  -72.99  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -66.17  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -66.17  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -72.99  H 47  S48  L86 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="99.70364191065703" cy="115.28014520874125" r="7" stroke="#4f5d42" stroke-width="3" fill="#4f5d42"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#4f5d42" stroke-width="3" fill="#ede6cb"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#4f5d42" stroke-width="3" fill="#f5d893"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#4f5d42" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#4f5d42" stroke-width="3" fill="#ede6cb"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_5">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #5</h3>
  <span style="color:#704d2b">&#9632;</span>#704d2b | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #704d2b;  /* Lc    0.00  H 29  S44  L30 */
  --text:         #ede6cb;  /* Lc  -74.50  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -67.68  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -67.68  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -74.50  H 47  S48  L86 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="134.84790086526158" cy="119.7683903729764" r="7" stroke="#704d2b" stroke-width="3" fill="#704d2b"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#704d2b" stroke-width="3" fill="#ede6cb"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#704d2b" stroke-width="3" fill="#f5d893"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#704d2b" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#704d2b" stroke-width="3" fill="#ede6cb"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_6">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #6</h3>
  <span style="color:#314e3f">&#9632;</span>#314e3f | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #314e3f;  /* Lc    0.00  H148  S22  L24 */
  --text:         #ede6cb;  /* Lc  -79.02  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -72.20  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -72.20  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -79.02  H 47  S48  L86 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="82.39057299372121" cy="110.59524068686636" r="7" stroke="#314e3f" stroke-width="3" fill="#314e3f"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#314e3f" stroke-width="3" fill="#ede6cb"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#314e3f" stroke-width="3" fill="#f5d893"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#314e3f" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#314e3f" stroke-width="3" fill="#ede6cb"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_7">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #7</h3>
  <span style="color:#2b454f">&#9632;</span>#2b454f | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #2b454f;  /* Lc    0.00  H196  S29  L23 */
  --text:         #ede6cb;  /* Lc  -81.22  H 47  S48  L86 */
  --accent:       #f5d893;  /* Lc  -74.40  H 42  S83  L76 */
  --primary:      #f5d893;  /* Lc  -74.40  H 42  S83  L76 */
  --secondary:    #ede6cb;  /* Lc  -81.22  H 47  S48  L86 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="74.55831131227718" cy="92.38325840996777" r="7" stroke="#2b454f" stroke-width="3" fill="#2b454f"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#2b454f" stroke-width="3" fill="#ede6cb"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#2b454f" stroke-width="3" fill="#f5d893"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#2b454f" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#2b454f" stroke-width="3" fill="#ede6cb"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_8">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #8</h3>
  <span style="color:#1d3230">&#9632;</span>#1d3230 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#e8b26f">&#9632;</span>#e8b26f<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #1d3230;  /* Lc    0.00  H174  S26  L15 */
  --text:         #f5d893;  /* Lc  -79.90  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -86.72  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -86.72  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -61.55  H 33  S72  L67 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="76.19483334885305" cy="102.38206620336828" r="7" stroke="#1d3230" stroke-width="3" fill="#1d3230"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#1d3230" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#1d3230" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#1d3230" stroke-width="3" fill="#ede6cb"/>
    <circle cx="154.5506246802458" cy="135.7284029884459" r="7" stroke="#1d3230" stroke-width="3" fill="#e8b26f"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_9">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #9</h3>
  <span style="color:#40231e">&#9632;</span>#40231e | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#e8b26f">&#9632;</span>#e8b26f<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #40231e;  /* Lc    0.00  H  8  S36  L18 */
  --text:         #f5d893;  /* Lc  -80.57  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -87.39  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -87.39  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -62.21  H 33  S72  L67 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="132.16793983583673" cy="104.99338791413594" r="7" stroke="#40231e" stroke-width="3" fill="#40231e"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#40231e" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#40231e" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#40231e" stroke-width="3" fill="#ede6cb"/>
    <circle cx="154.5506246802458" cy="135.7284029884459" r="7" stroke="#40231e" stroke-width="3" fill="#e8b26f"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_10">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #10</h3>
  <span style="color:#151d1a">&#9632;</span>#151d1a | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#e8b26f">&#9632;</span>#e8b26f<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #151d1a;  /* Lc    0.00  H157  S16  L 9 */
  --text:         #f5d893;  /* Lc  -83.17  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -89.99  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -89.99  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -64.82  H 33  S72  L67 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="86.69613473183747" cy="105.51064142605729" r="7" stroke="#151d1a" stroke-width="3" fill="#151d1a"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#151d1a" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#151d1a" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#151d1a" stroke-width="3" fill="#ede6cb"/>
    <circle cx="154.5506246802458" cy="135.7284029884459" r="7" stroke="#151d1a" stroke-width="3" fill="#e8b26f"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_11">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #11</h3>
  <span style="color:#111215">&#9632;</span>#111215 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#e8b26f">&#9632;</span>#e8b26f<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #111215;  /* Lc    0.00  H225  S10  L 7 */
  --text:         #f5d893;  /* Lc  -84.09  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -90.91  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -90.91  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -65.74  H 33  S72  L67 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="93.30109365191691" cy="93.30109365191691" r="7" stroke="#111215" stroke-width="3" fill="#111215"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#111215" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#111215" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#111215" stroke-width="3" fill="#ede6cb"/>
    <circle cx="154.5506246802458" cy="135.7284029884459" r="7" stroke="#111215" stroke-width="3" fill="#e8b26f"/>

  </svg>
</div>
<hr/>
<div class="pgalaxy-flame_12">
  <h3><span class="icon">&#9632;</span>Palette galaxy-flame #12</h3>
  <span style="color:#151015">&#9632;</span>#151015 | <span style="color:#f5d893">&#9632;</span>#f5d893 | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#ede6cb">&#9632;</span>#ede6cb | <span style="color:#e8b26f">&#9632;</span>#e8b26f<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #151015;  /* Lc    0.00  H300  S13  L 7 */
  --text:         #f5d893;  /* Lc  -84.12  H 42  S83  L76 */
  --accent:       #ede6cb;  /* Lc  -90.94  H 47  S48  L86 */
  --primary:      #ede6cb;  /* Lc  -90.94  H 47  S48  L86 */
  --secondary:    #e8b26f;  /* Lc  -65.77  H 33  S72  L67 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="106.08108108108108" cy="89.46725860262168" r="7" stroke="#151015" stroke-width="3" fill="#151015"/>
    <circle cx="155.3326435102058" cy="150.25164281444756" r="7" stroke="#151015" stroke-width="3" fill="#f5d893"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#151015" stroke-width="3" fill="#ede6cb"/>
    <circle cx="129.45012385083524" cy="132.30524695278885" r="7" stroke="#151015" stroke-width="3" fill="#ede6cb"/>
    <circle cx="154.5506246802458" cy="135.7284029884459" r="7" stroke="#151015" stroke-width="3" fill="#e8b26f"/>

  </svg>
</div>
<hr/>
