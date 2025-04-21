# Palette uuu

<span style="color:#33ddee">&#9632;</span>#33ddee

<span style="color:#1188cc">&#9632;</span>#1188cc

<span style="color:#112299">&#9632;</span>#112299

<span style="color:#5533aa">&#9632;</span>#5533aa

<span style="color:#ff44ee">&#9632;</span>#ff44ee

<span style="color:#ffffff">&#9632;</span>#ffffff

<span style="color:#eecc44">&#9632;</span>#eecc44

<span style="color:#ee2211">&#9632;</span>#ee2211

<span style="color:#552233">&#9632;</span>#552233

<span style="color:#000011">&#9632;</span>#000011

<span style="color:#668877">&#9632;</span>#668877

<span style="color:#88bb22">&#9632;</span>#88bb22

## APCA Lc Background (X) vs Foreground (Y)

|         | #ffffff | #eecc44 | #33ddee | #1188cc | #668877 | #ee2211 | #5533aa | #112299 | #552233 | #000011 |
| ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: | ------: |
| #000011 |  105.98 |   77.77 |   75.44 |         |         |         |         |         |         |         |
| #552233 |   98.21 |      70 |   67.66 |         |         |         |         |         |         |         |
| #112299 |   96.69 |   68.48 |   66.14 |         |         |         |         |         |         |         |
| #5533aa |   88.91 |   60.69 |         |         |         |         |         |         |         |         |
| #ee2211 |   67.59 |         |         |         |         |         |         |         |         |         |
| #668877 |   66.61 |         |         |         |         |         |         |         |         |         |
| #1188cc |   65.65 |         |         |         |         |         |         |         |         |         |
| #33ddee |         |         |         |         |         |         |   -60.2 |  -67.07 |  -68.36 |  -74.56 |
| #eecc44 |         |         |         |         |         |         |   -62.7 |  -69.57 |  -70.86 |  -77.07 |
| #ffffff |         |         |         |  -71.16 |  -72.13 |   -73.1 |  -93.49 | -100.36 | -101.65 | -107.85 |

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
.puuu_0 {
  --background:   #ffffff;  /* Lc    0.00  HNaN  S 0  L100 */
  --text:         #552233;  /* Lc   98.21  H340  S42  L23 */
  --accent:       #000011;  /* Lc  105.98  H240  S100  L 3 */
  --primary:      #112299;  /* Lc   96.69  H232  S80  L33 */
  --secondary:    #5533aa;  /* Lc   88.91  H257  S53  L43 */
}
.puuu_1 {
  --background:   #eecc44;  /* Lc    0.00  H 48  S83  L60 */
  --text:         #552233;  /* Lc   70.00  H340  S42  L23 */
  --accent:       #000011;  /* Lc   77.77  H240  S100  L 3 */
  --primary:      #112299;  /* Lc   68.48  H232  S80  L33 */
  --secondary:    #5533aa;  /* Lc   60.69  H257  S53  L43 */
}
.puuu_2 {
  --background:   #33ddee;  /* Lc    0.00  H185  S84  L56 */
  --text:         #552233;  /* Lc   67.66  H340  S42  L23 */
  --accent:       #000011;  /* Lc   75.44  H240  S100  L 3 */
  --primary:      #000011;  /* Lc   75.44  H240  S100  L 3 */
  --secondary:    #112299;  /* Lc   66.14  H232  S80  L33 */
}
.puuu_3 {
  --background:   #1188cc;  /* Lc    0.00  H201  S84  L43 */
  --text:         #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
}
.puuu_4 {
  --background:   #668877;  /* Lc    0.00  H150  S14  L46 */
  --text:         #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
}
.puuu_5 {
  --background:   #ee2211;  /* Lc    0.00  H  4  S86  L50 */
  --text:         #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
}
.puuu_6 {
  --background:   #5533aa;  /* Lc    0.00  H257  S53  L43 */
  --text:         #eecc44;  /* Lc  -62.70  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc  -93.49  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -93.49  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -60.20  H185  S84  L56 */
}
.puuu_7 {
  --background:   #112299;  /* Lc    0.00  H232  S80  L33 */
  --text:         #eecc44;  /* Lc  -69.57  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc -100.36  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc -100.36  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -67.07  H185  S84  L56 */
}
.puuu_8 {
  --background:   #552233;  /* Lc    0.00  H340  S42  L23 */
  --text:         #eecc44;  /* Lc  -70.86  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc -101.65  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc -101.65  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -68.36  H185  S84  L56 */
}
.puuu_9 {
  --background:   #000011;  /* Lc    0.00  H240  S100  L 3 */
  --text:         #eecc44;  /* Lc  -77.07  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc -107.85  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc -107.85  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -74.56  H185  S84  L56 */
}
</style>

<div class="puuu_0">
  <h3><span class="icon">&#9632;</span>Palette uuu #0</h3>
  <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#552233">&#9632;</span>#552233 | <span style="color:#000011">&#9632;</span>#000011 | <span style="color:#112299">&#9632;</span>#112299 | <span style="color:#5533aa">&#9632;</span>#5533aa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ffffff;  /* Lc    0.00  HNaN  S 0  L100 */
  --text:         #552233;  /* Lc   98.21  H340  S42  L23 */
  --accent:       #000011;  /* Lc  105.98  H240  S100  L 3 */
  --primary:      #112299;  /* Lc   96.69  H232  S80  L33 */
  --secondary:    #5533aa;  /* Lc   88.91  H257  S53  L43 */
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
    <circle cx="136.24528680174217" cy="86.80779447172421" r="7" stroke="#ffffff" stroke-width="3" fill="#552233"/>
    <circle cx="54.99999999999995" cy="22.05771365940052" r="7" stroke="#ffffff" stroke-width="3" fill="#000011"/>
    <circle cx="56.16917711137209" cy="42.87855949903108" r="7" stroke="#ffffff" stroke-width="3" fill="#112299"/>
    <circle cx="89.21629320057856" cy="52.75349348657317" r="7" stroke="#ffffff" stroke-width="3" fill="#5533aa"/>

  </svg>
</div>
<hr/>
<div class="puuu_1">
  <h3><span class="icon">&#9632;</span>Palette uuu #1</h3>
  <span style="color:#eecc44">&#9632;</span>#eecc44 | <span style="color:#552233">&#9632;</span>#552233 | <span style="color:#000011">&#9632;</span>#000011 | <span style="color:#112299">&#9632;</span>#112299 | <span style="color:#5533aa">&#9632;</span>#5533aa<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #eecc44;  /* Lc    0.00  H 48  S83  L60 */
  --text:         #552233;  /* Lc   70.00  H340  S42  L23 */
  --accent:       #000011;  /* Lc   77.77  H240  S100  L 3 */
  --primary:      #112299;  /* Lc   68.48  H232  S80  L33 */
  --secondary:    #5533aa;  /* Lc   60.69  H257  S53  L43 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="150.18479547691436" cy="155.73586191080457" r="7" stroke="#eecc44" stroke-width="3" fill="#eecc44"/>
    <circle cx="136.24528680174217" cy="86.80779447172421" r="7" stroke="#eecc44" stroke-width="3" fill="#552233"/>
    <circle cx="54.99999999999995" cy="22.05771365940052" r="7" stroke="#eecc44" stroke-width="3" fill="#000011"/>
    <circle cx="56.16917711137209" cy="42.87855949903108" r="7" stroke="#eecc44" stroke-width="3" fill="#112299"/>
    <circle cx="89.21629320057856" cy="52.75349348657317" r="7" stroke="#eecc44" stroke-width="3" fill="#5533aa"/>

  </svg>
</div>
<hr/>
<div class="puuu_2">
  <h3><span class="icon">&#9632;</span>Palette uuu #2</h3>
  <span style="color:#33ddee">&#9632;</span>#33ddee | <span style="color:#552233">&#9632;</span>#552233 | <span style="color:#000011">&#9632;</span>#000011 | <span style="color:#000011">&#9632;</span>#000011 | <span style="color:#112299">&#9632;</span>#112299<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #33ddee;  /* Lc    0.00  H185  S84  L56 */
  --text:         #552233;  /* Lc   67.66  H340  S42  L23 */
  --accent:       #000011;  /* Lc   75.44  H240  S100  L 3 */
  --primary:      #000011;  /* Lc   75.44  H240  S100  L 3 */
  --secondary:    #112299;  /* Lc   66.14  H232  S80  L33 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="24.19098435789587" cy="92.76111670221994" r="7" stroke="#33ddee" stroke-width="3" fill="#33ddee"/>
    <circle cx="136.24528680174217" cy="86.80779447172421" r="7" stroke="#33ddee" stroke-width="3" fill="#552233"/>
    <circle cx="54.99999999999995" cy="22.05771365940052" r="7" stroke="#33ddee" stroke-width="3" fill="#000011"/>
    <circle cx="54.99999999999995" cy="22.05771365940052" r="7" stroke="#33ddee" stroke-width="3" fill="#000011"/>
    <circle cx="56.16917711137209" cy="42.87855949903108" r="7" stroke="#33ddee" stroke-width="3" fill="#112299"/>

  </svg>
</div>
<hr/>
<div class="puuu_3">
  <h3><span class="icon">&#9632;</span>Palette uuu #3</h3>
  <span style="color:#1188cc">&#9632;</span>#1188cc | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #1188cc;  /* Lc    0.00  H201  S84  L43 */
  --text:         #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -71.16  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="29.30121125492984" cy="71.6964745304828" r="7" stroke="#1188cc" stroke-width="3" fill="#1188cc"/>
    <circle cx="100" cy="100" r="7" stroke="#1188cc" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#1188cc" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#1188cc" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#1188cc" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="puuu_4">
  <h3><span class="icon">&#9632;</span>Palette uuu #4</h3>
  <span style="color:#668877">&#9632;</span>#668877 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #668877;  /* Lc    0.00  H150  S14  L46 */
  --text:         #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -72.13  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="88.86538766562865" cy="106.42857142857143" r="7" stroke="#668877" stroke-width="3" fill="#668877"/>
    <circle cx="100" cy="100" r="7" stroke="#668877" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#668877" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#668877" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#668877" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="puuu_5">
  <h3><span class="icon">&#9632;</span>Palette uuu #5</h3>
  <span style="color:#ee2211">&#9632;</span>#ee2211 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #ee2211;  /* Lc    0.00  H  4  S86  L50 */
  --text:         #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
  --accent:       #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
  --secondary:    #ffffff;  /* Lc  -73.10  HNaN  S 0  L100 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="177.74707003446838" cy="106.27639235990462" r="7" stroke="#ee2211" stroke-width="3" fill="#ee2211"/>
    <circle cx="100" cy="100" r="7" stroke="#ee2211" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#ee2211" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#ee2211" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#ee2211" stroke-width="3" fill="#ffffff"/>

  </svg>
</div>
<hr/>
<div class="puuu_6">
  <h3><span class="icon">&#9632;</span>Palette uuu #6</h3>
  <span style="color:#5533aa">&#9632;</span>#5533aa | <span style="color:#eecc44">&#9632;</span>#eecc44 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#33ddee">&#9632;</span>#33ddee<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #5533aa;  /* Lc    0.00  H257  S53  L43 */
  --text:         #eecc44;  /* Lc  -62.70  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc  -93.49  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc  -93.49  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -60.20  H185  S84  L56 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="89.21629320057856" cy="52.75349348657317" r="7" stroke="#5533aa" stroke-width="3" fill="#5533aa"/>
    <circle cx="150.18479547691436" cy="155.73586191080457" r="7" stroke="#5533aa" stroke-width="3" fill="#eecc44"/>
    <circle cx="100" cy="100" r="7" stroke="#5533aa" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#5533aa" stroke-width="3" fill="#ffffff"/>
    <circle cx="24.19098435789587" cy="92.76111670221994" r="7" stroke="#5533aa" stroke-width="3" fill="#33ddee"/>

  </svg>
</div>
<hr/>
<div class="puuu_7">
  <h3><span class="icon">&#9632;</span>Palette uuu #7</h3>
  <span style="color:#112299">&#9632;</span>#112299 | <span style="color:#eecc44">&#9632;</span>#eecc44 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#33ddee">&#9632;</span>#33ddee<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #112299;  /* Lc    0.00  H232  S80  L33 */
  --text:         #eecc44;  /* Lc  -69.57  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc -100.36  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc -100.36  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -67.07  H185  S84  L56 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="56.16917711137209" cy="42.87855949903108" r="7" stroke="#112299" stroke-width="3" fill="#112299"/>
    <circle cx="150.18479547691436" cy="155.73586191080457" r="7" stroke="#112299" stroke-width="3" fill="#eecc44"/>
    <circle cx="100" cy="100" r="7" stroke="#112299" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#112299" stroke-width="3" fill="#ffffff"/>
    <circle cx="24.19098435789587" cy="92.76111670221994" r="7" stroke="#112299" stroke-width="3" fill="#33ddee"/>

  </svg>
</div>
<hr/>
<div class="puuu_8">
  <h3><span class="icon">&#9632;</span>Palette uuu #8</h3>
  <span style="color:#552233">&#9632;</span>#552233 | <span style="color:#eecc44">&#9632;</span>#eecc44 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#33ddee">&#9632;</span>#33ddee<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #552233;  /* Lc    0.00  H340  S42  L23 */
  --text:         #eecc44;  /* Lc  -70.86  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc -101.65  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc -101.65  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -68.36  H185  S84  L56 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="136.24528680174217" cy="86.80779447172421" r="7" stroke="#552233" stroke-width="3" fill="#552233"/>
    <circle cx="150.18479547691436" cy="155.73586191080457" r="7" stroke="#552233" stroke-width="3" fill="#eecc44"/>
    <circle cx="100" cy="100" r="7" stroke="#552233" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#552233" stroke-width="3" fill="#ffffff"/>
    <circle cx="24.19098435789587" cy="92.76111670221994" r="7" stroke="#552233" stroke-width="3" fill="#33ddee"/>

  </svg>
</div>
<hr/>
<div class="puuu_9">
  <h3><span class="icon">&#9632;</span>Palette uuu #9</h3>
  <span style="color:#000011">&#9632;</span>#000011 | <span style="color:#eecc44">&#9632;</span>#eecc44 | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#ffffff">&#9632;</span>#ffffff | <span style="color:#33ddee">&#9632;</span>#33ddee<br/>
  <button class="primary">Primary Button</button>
  <button class="secondary">Secondary Button</button>
  <pre><code>
{
  --background:   #000011;  /* Lc    0.00  H240  S100  L 3 */
  --text:         #eecc44;  /* Lc  -77.07  H 48  S83  L60 */
  --accent:       #ffffff;  /* Lc -107.85  HNaN  S 0  L100 */
  --primary:      #ffffff;  /* Lc -107.85  HNaN  S 0  L100 */
  --secondary:    #33ddee;  /* Lc  -74.56  H185  S84  L56 */
}
  </code></pre>
  <svg viewbox="0 0 200 200" width="250px">
    <clipPath id="clip">
      <path d="M 100 100 m 100, 0 a 100,100 0 1,0 -200,0 a 100,100 0 1,0  200,0"/>
    </clipPath>
    <foreignObject x="0" y="0" width="200" height="200" clip-path="url(#clip)">
        <div class="gradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>
    <circle cx="54.99999999999995" cy="22.05771365940052" r="7" stroke="#000011" stroke-width="3" fill="#000011"/>
    <circle cx="150.18479547691436" cy="155.73586191080457" r="7" stroke="#000011" stroke-width="3" fill="#eecc44"/>
    <circle cx="100" cy="100" r="7" stroke="#000011" stroke-width="3" fill="#ffffff"/>
    <circle cx="100" cy="100" r="7" stroke="#000011" stroke-width="3" fill="#ffffff"/>
    <circle cx="24.19098435789587" cy="92.76111670221994" r="7" stroke="#000011" stroke-width="3" fill="#33ddee"/>

  </svg>
</div>
<hr/>
