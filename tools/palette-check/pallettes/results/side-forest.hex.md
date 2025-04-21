# Palette side-forest

<span style="color:#221122">&#9632;</span>#221122

<span style="color:#332233">&#9632;</span>#332233

<span style="color:#334444">&#9632;</span>#334444

<span style="color:#336644">&#9632;</span>#336644

<span style="color:#668855">&#9632;</span>#668855

<span style="color:#99aa55">&#9632;</span>#99aa55

<span style="color:#ccaa88">&#9632;</span>#ccaa88

<span style="color:#ddccbb">&#9632;</span>#ddccbb

<span style="color:#889999">&#9632;</span>#889999

<span style="color:#776688">&#9632;</span>#776688

<span style="color:#663355">&#9632;</span>#663355

<span style="color:#bb7777">&#9632;</span>#bb7777

## APCA Lc Background (X) vs Foreground (Y)

|         | #ddccbb | #663355 | #334444 | #332233 | #221122 |
| ------: | ------: | ------: | ------: | ------: | ------: |
| #221122 |   76.53 |         |         |         |         |
| #332233 |   73.55 |         |         |         |         |
| #334444 |    65.7 |         |         |         |         |
| #663355 |   64.07 |         |         |         |         |
| #ddccbb |         |  -65.76 |   -67.2 |  -73.83 |  -76.18 |

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
.pside-forest_0 {
  --background:   #ddccbb;  /* Lc    0.00  H 30  S33  L80 */
  --text:         #332233;  /* Lc   73.55  H300  S20  L16 */
  --accent:       #221122;  /* Lc   76.53  H300  S33  L10 */
  --primary:      #334444;  /* Lc   65.70  H180  S14  L23 */
  --secondary:    #663355;  /* Lc   64.07  H320  S33  L30 */
}
.pside-forest_1 {
  --background:   #663355;  /* Lc    0.00  H320  S33  L30 */
  --text:         #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
}
.pside-forest_2 {
  --background:   #334444;  /* Lc    0.00  H180  S14  L23 */
  --text:         #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
}
.pside-forest_3 {
  --background:   #332233;  /* Lc    0.00  H300  S20  L16 */
  --text:         #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
}
.pside-forest_4 {
  --background:   #221122;  /* Lc    0.00  H300  S33  L10 */
  --text:         #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
}
</style>

<div class="pside-forest_0">
  <h3><span class="icon">&#9632;</span>Palette side-forest #0</h3>
  <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#332233">&#9632;</span>#332233 | <span style="color:#221122">&#9632;</span>#221122 | <span style="color:#334444">&#9632;</span>#334444 | <span style="color:#663355">&#9632;</span>#663355<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ddccbb;  /* Lc    0.00  H 30  S33  L80 */
  --text:         #332233;  /* Lc   73.55  H300  S20  L16 */
  --accent:       #221122;  /* Lc   76.53  H300  S33  L10 */
  --primary:      #334444;  /* Lc   65.70  H180  S14  L23 */
  --secondary:    #663355;  /* Lc   64.07  H320  S33  L30 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#ddccbb" stroke-width="3" fill="#ddccbb"/>
    <circle cx="109" cy="84.4115427318801" r="7" stroke="#ddccbb" stroke-width="3" fill="#332233"/>
    <circle cx="115" cy="74.01923788646684" r="7" stroke="#ddccbb" stroke-width="3" fill="#221122"/>
    <circle cx="87.14285714285714" cy="100" r="7" stroke="#ddccbb" stroke-width="3" fill="#334444"/>
    <circle cx="122.98133329356936" cy="80.71637170940386" r="7" stroke="#ddccbb" stroke-width="3" fill="#663355"/>

  </svg>
</div>
<hr/>
<div class="pside-forest_1">
  <h3><span class="icon">&#9632;</span>Palette side-forest #1</h3>
  <span style="color:#663355">&#9632;</span>#663355 | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #663355;  /* Lc    0.00  H320  S33  L30 */
  --text:         #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -65.76  H 30  S33  L80 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="122.98133329356936" cy="80.71637170940386" r="7" stroke="#663355" stroke-width="3" fill="#663355"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#663355" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#663355" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#663355" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#663355" stroke-width="3" fill="#ddccbb"/>

  </svg>
</div>
<hr/>
<div class="pside-forest_2">
  <h3><span class="icon">&#9632;</span>Palette side-forest #2</h3>
  <span style="color:#334444">&#9632;</span>#334444 | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #334444;  /* Lc    0.00  H180  S14  L23 */
  --text:         #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -67.20  H 30  S33  L80 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="87.14285714285714" cy="100" r="7" stroke="#334444" stroke-width="3" fill="#334444"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#334444" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#334444" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#334444" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#334444" stroke-width="3" fill="#ddccbb"/>

  </svg>
</div>
<hr/>
<div class="pside-forest_3">
  <h3><span class="icon">&#9632;</span>Palette side-forest #3</h3>
  <span style="color:#332233">&#9632;</span>#332233 | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #332233;  /* Lc    0.00  H300  S20  L16 */
  --text:         #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -73.83  H 30  S33  L80 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="109" cy="84.4115427318801" r="7" stroke="#332233" stroke-width="3" fill="#332233"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#332233" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#332233" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#332233" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#332233" stroke-width="3" fill="#ddccbb"/>

  </svg>
</div>
<hr/>
<div class="pside-forest_4">
  <h3><span class="icon">&#9632;</span>Palette side-forest #4</h3>
  <span style="color:#221122">&#9632;</span>#221122 | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb | <span style="color:#ddccbb">&#9632;</span>#ddccbb<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #221122;  /* Lc    0.00  H300  S33  L10 */
  --text:         #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
  --accent:       #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
  --primary:      #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
  --secondary:    #ddccbb;  /* Lc  -76.18  H 30  S33  L80 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="115" cy="74.01923788646684" r="7" stroke="#221122" stroke-width="3" fill="#221122"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#221122" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#221122" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#221122" stroke-width="3" fill="#ddccbb"/>
    <circle cx="125.98076211353317" cy="115.00000000000003" r="7" stroke="#221122" stroke-width="3" fill="#ddccbb"/>

  </svg>
</div>
<hr/>
