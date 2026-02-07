<?php

include("../_includes/init.php");

$page_name = "Textová stránka";
$page_type = "text";

?>

<?php include("../_includes/html-head.php") ?>

<?php include("../_components/head/head.php") ?>

<div class="vc-main">
  <div class="vc-container">

    <div class="vc-row">

      <div class="vc-content vc-content-narrower vc-content-centered">

        <h1 class="vc-page-heading">Výchozí formátování typografické základny vycházející z Boostrapu</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, non, facere incidunt aut expedita esse quod unde eveniet tenetur veritatis voluptatum id deleniti similique enim praesentium earum reprehenderit quidem amet.</p>

        <h2>This document shows various HTML elements</h2>

        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit Lorem ipsum dolor sit amet, volutpat. </p>
        <h2>This is 2nd level heading bh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi luptatum zzril delenit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam no</h2>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>

        <h3>This is 3rd level heading</h3>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
        <h4>This is 4th level heading</h4>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
        <h5>This is 5th level heading</h5>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
        <h6>This is 6th level heading</h6>


        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>

        <h2>Basic block level elements</h2>

        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim zzril delenit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

        <address>This holds an address. Block level, but without margin or padding because they're often stacked.</address>

        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim zzril delenit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

        <div>This is a <code>div</code> element. Lorem ipsum dolor sit amet, elit, sed diam nonummy nibh euismod tincidunt ut consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. (End of <code>div</code>.)</div>

        <blockquote>
          <p>This is a block quotation containing a <em>single</em> paragraph. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p></blockquote>


        <p>The following contains address information about the author, in an <code>address</code> element.</p>


        <h2>Lists</h2>

        <p>This is a paragraph before an <strong>unnumbered</strong> list (<code>ul</code>). Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

        <ul>
          <li>One.</li>
          <li>Two.</li>
          <li>Three. Well, probably this list item should be longer. Note that for short items lists look better if they are compactly presented, whereas for long items, it would be better to have more vertical spacing between items.</li>
          <li>Four. This is the last item in this list. Let us terminate the list now without making any more fuss about it.</li>
        </ul>

        <p>This is a paragraph before a <strong>numbered</strong> list (<code>ol</code>). Note that the spacing between a paragraph and a list before or after that is hard to tune in a user style sheet. You can't guess which paragraphs are logically related to a list, e.g. as a "list header".</p>

        <ol>
          <li>One.</li>
          <li>Two.</li>
          <li>Three. Well, probably this list item should be longer. Note that if items are short, lists look better if they are compactly presented, whereas for long items, it would be better to have more vertical spacing between items.</li>
          <li>Four. This is the last item in this list. Let us terminate the list now without making any more fuss about it.</li>
          <li>Five</li>
          <li>Six</li>
          <li>Seven</li>
          <li>Eight</li>
          <li>Nine</li>
          <li>Ten</li>

        </ol>

        <p>This is a paragraph before a <strong>definition</strong> list (<code>dl</code>). In principle, such a list should consist of <em>terms</em> and associated definitions. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </p>
        <dl>
          <dt>Apple</dt>
          <dd>is a fruit.</dd>
          <dt>Banana</dt>
          <dd>Is also a fruit.</dd>
          <dt>Tomato</dt>
          <dd>Is debatable. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</dd>
        </dl>

        <h2>Text-level markup</h2>


        <ul>
          <li><abbr title="Cascading Style Sheets">CSS</abbr> (an abbreviation; <code>abbr</code> markup used)</li>
          <li><acronym title="radio detecting and ranging">radar</acronym> (an acronym; <code>acronym</code> markup used)</li>
          <li><cite>Origin of Species</cite> (a book title; <code>cite</code> markup used)</li>
          <li><code>a[i] = b[i] + c[i);</code> (computer code; <code>code</code> markup used)</li>
          <li>an <dfn>octet</dfn> is an entity consisting of eight bits (<code>dfn</code> markup used for the term being defined)</li>
          <li>this is <em>very</em> simple (<code>em</code> markup used for emphasizing a word)</li>
          <li>type <kbd>yes</kbd> when prompted for an answer (<code>kbd</code> markup used for text indicating keyboard input)</li>
          <li><q>Hello!</q> (<code>q</code> markup used for quotation)</li>
          <li>He said: <q>She said <q>Hello!</q></q> (a quotation inside a quotation)</li>
          <li>you may get the message <samp>Core dumped</samp> at times (<code>samp</code> markup used for sample output)</li>
          <li><strong>this is highlighted text</strong> (<code>strong</code> markup used)</li>
          <li><tt>text in monospace font</tt> (<code>tt</code> markup used)</li>
          <li>the command <code>cat</code> <var>filename</var> displays the file specified by the <var>filename</var> (<code>var</code> markup used to indicate a word as a variable).</li>
          <li>In order to test how subscripts and superscripts (<code>sub</code> and <code>sup</code> markup) work inside running text, we need some dummy text around constructs like x<sub>1</sub> and H<sub>2</sub>O (where subscripts occur). So here is some fill so that you will (hopefully) see whether and how badly the subscripts and superscripts mess up vertical spacing between lines. Now superscripts: M<sup>lle</sup>, 1<sup>st</sup>, and then some mathematical notations: e<sup>x</sup>, sin<sup>2</sup> <i>x</i>, and some nested superscripts (exponents) too: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </li>
        </ul>

        <p>Some of the elements tested above are typically displayed in a monospace font, often using the <em>same</em> presentation for all of them. This tests whether that is the case on your browser:</p>

        <ul>
          <li><code>This is sample text inside code markup</code></li>
          <li><kbd>This is sample text inside kbd markup</kbd></li>
          <li><samp>This is sample text inside samp markup</samp></li>
          <li><tt>This is sample text inside tt markup</tt></li>
        </ul>

        <h2>Links</h2>

        <ul>
          <li><a href="http://developer.yahoo.com/yui">developer.yahoo.com/yui</a></li>
          <li><a href="http://yuiblog.com">the YUI Blog</a></li>
        </ul>


        <h2>Tables</h2>

        <p>The following table has a caption. The first row and the first column contain table header cells only; other cells are data cells.</p>


        <div class="table-responsive">
          <table class="table" summary="each row names a nordic country and specifies its total area and land area, in square kilometers">
            <caption>Caption: Sample table: Areas of the Nordic countries, in sq km</caption>
            <thead>
            <tr>
              <th>Country</th>
              <th>Total area</th>
              <th>Land area</th>
              <th>Population</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>Denmark</th>
              <td>43,070</td>
              <td>42,370</td>
              <td>7,230,000</td>
            </tr>
            <tr>
              <th>Finland</th>
              <td>337,030</td>
              <td>305,470</td>
              <td>17,830,000</td>
            </tr>
            <tr>
              <th>Iceland</th>
              <td>103,000</td>
              <td>100,250</td>
              <td>5,230,000</td>
            </tr>
            <tr>
              <th>Norway</th>
              <td>324,220</td>
              <td>307,860</td>
              <td>18,200,000</td>
            </tr>
            <tr>
              <th>Sweden</th>
              <td>449,964</td>
              <td>410,928</td>
              <td>28,570,000</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="table-responsive">
          <table class="table table-hover" summary="table with hover rows">
            <caption>Caption: table with hover rows</caption>
            <thead>
            <tr>
              <th>Country</th>
              <th>Total area</th>
              <th>Land area</th>
              <th>Population</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>Denmark</th>
              <td>43,070</td>
              <td>42,370</td>
              <td>7,230,000</td>
            </tr>
            <tr>
              <th>Finland</th>
              <td>337,030</td>
              <td>305,470</td>
              <td>17,830,000</td>
            </tr>
            <tr>
              <th>Iceland</th>
              <td>103,000</td>
              <td>100,250</td>
              <td>5,230,000</td>
            </tr>
            <tr>
              <th>Norway</th>
              <td>324,220</td>
              <td>307,860</td>
              <td>18,200,000</td>
            </tr>
            <tr>
              <th>Sweden</th>
              <td>449,964</td>
              <td>410,928</td>
              <td>28,570,000</td>
            </tr>
            </tbody>
          </table>
        </div>


        <h2>Forms</h2>


        <!-- TODO:
           - formular vycniva z layoutu, ale mozna neni tak dulezite,
             protoze jej takhle snad ani nebudeme pouzivat
           - dole hotfix
          -->

        <style>
          .form {
            padding-left: 15px;
            padding-right: 15px;
          }
        </style>

        <form class="form form-horizontal" role="form">
          <fieldset>
            <div class="form-group">
              <div class="col-sm-8 col-sm-offset-4">
                <h3>Contact form</h3>
              </div>
            </div>
            <div class="form-group">
              <label for="name" class="control-label col-sm-4">
                Name
              </label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="name">
              </div>
            </div>
            <div class="form-group">
              <label for="email" class="control-label col-sm-4">
                Email
              </label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="email">
              </div>
            </div>
            <div class="form-group">
              <label for="message" class="control-label col-sm-4">
                Message
              </label>
              <div class="col-sm-8">
                <textarea id="message" class="form-control" rows="5"></textarea>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-8 col-sm-offset-4">
                <div class="checkbox">
                  <label for="newsletter">
                    <input type="checkbox" id="newsletter">&nbsp;Send me a monthly newsletter
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-8 col-sm-offset-4">
                <button class="vc-btn vc-btn-primary" type="submit">Send</button>
              </div>
            </div>
          </fieldset>
        </form>



        <br><br>

        <form action="http://www.cs.tut.fi/cgi-bin/run/~jkorpela/echo.cgi">

          <div><input type="hidden" name="hidden field" value="42"></div>
          <div><label for="f1">Single-line text input field: <input id="f1" name="text" class="form-control" size="20" value="Default text."></label></div>
          <div><label for="f2">Multi-line text input field (textarea):</label></div>
          <div><textarea id="f2" class="form-control" name="textarea" rows="16" cols="20">Default text.</textarea></div>

          <p>The following two radio buttons are inside <code>fieldset</code> element with a <code>legend</code>:</p>


          <fieldset>
            <legend>Legend</legend>
            <div class="radio">
              <label for="f3">
                <input id="f3" type="radio" name="radio" value="1">
                Radio button 1
              </label>
            </div>
            <div class="radio">
              <label for="f4">
                <input id="f4" type="radio" name="radio" value="2" checked="">
                Radio button 2 (initially checked)
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Check those that apply</legend>
            <div class="checkbox">
              <label for="f5">
                <input id="f5" type="checkbox" name="checkbox">
                Checkbox 1
              </label>
            </div>
            <div class="checkbox">
              <label for="f6">
                <input id="f6" type="checkbox" name="checkbox2" checked="">
                Checkbox 2 (initially checked)
              </label>
            </div>
          </fieldset>

          <p>
            <label for="f10">A <code>select</code> element with <code>size="1"</code> (dropdown box):</label>
          </p>

          <p>
            <select id="f10" name="select1" class="form-control" size="1">
              <option>one</option>
              <option selected="">two (default)</option>
              <option>three</option>
            </select>
          </p>

          <p>
            <label for="f11">A <code>select</code> element with <code>size="3"</code> (listbox):</label>
          </p>

          <p>
            <select id="f11" name="select2" class="form-control" size="3">
              <option>one</option>
              <option selected="">two (default)</option>
              <option>three</option>
            </select>
          </p>

          <p>
            <label for="f99">Submit button:</label>
            <input id="f99" type="submit" name="submit" class="vc-btn vc-btn-primary" value="Just a test">
          </p>

          <p>
            <label for="f0">Reset button:</label>
            <input id="f0" type="reset" name="reset" class="vc-btn vc-btn-default"  value="Reset">
          </p>
        </form>


        <p>This next bit shows that PREformatted text is working.</p>

        <pre>1
         2
          3
           4
            5
        </pre>

      </div>

    </div>
  
    <?php include("../_includes/show-grid.php") ?>

  </div><!-- .vc-container -->
</div><!-- .vc-main -->

<?php include("../_components/foot/foot.php") ?>

<?php include("../_includes/html-foot.php") ?>
