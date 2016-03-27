var assert = require('chai').assert;
var converter = require('../lib/htmlToObjectConverter');

htmlArray = ['<div class="question" id="turn13.2-14">',
'<p>  <strong class="Question"><a href="http://db.chgk.info/question/turn13.2/14">Вопрос 14</a>:</strong> Еще до нашей эры римляне любили посмаковать гусиную печень, логично',
'называя ее "жирной". Мы не спрашиваем, какие две буквы мы пропустили в предыдущем предложении. Ответьте, чем предварительно откармливали этих гусей.</p>',
 '<div class="collapsible collapsed"><div class="collapse-processed"><a href="http://db.chgk.info/tour/turn13#">...</a></div><div class="div-wrapper"><p>',
 '<strong class="Answer">Ответ:</strong> Инжир.    </p><p><strong class="PassCriteria">Зачёт:</strong> Смоковница, смоква, фига, винная ягода.    </p><p>',
 '<strong class="Comments">Комментарий:</strong> Римляне откармливали гусей инжиром и называли блюдо "инжирной печенью". "Смаковать" — подсказка. Упомянутое блюдо — прообраз фуа-гра.    </p><p>',
 '<strong class="Sources">Источник(и):</strong> http://ru.science.wikia.com/wiki/Фуа_гра    </p><p>',
 '<strong class="Authors">Автор:</strong> <a href="http://db.chgk.info/person/mmezhova">Марина Межова</a> (Москва)    </p><a href="http://db.chgk.info/contact/question/turn13.2/14?destination=/tour/turn13" style="color:red;font-weight:bold;background-color:yellow;width:10px;text-decoration:none" title="Сообщить об ошибке">&nbsp;!&nbsp;</a></div>',
 '</div></div>'];

 var needFindClass = ['Question', 'Answer', 'PassCriteria', 'Comments', 'Sources'];

describe('html to object converter module test', () => {
  it('converter test', (done) => {
  	var html = htmlArray.join();
  	converter.convertHtmlToObject(html, '.question', (result) => {
  		assert.equal(result.length, 1);
  		needFindClass.forEach((value) => {
  			assert.isDefined(result[0][value.toLowerCase()], value.toLowerCase() + ' property hasn\'t define');
  		});
  		done();
  	});
  });
});
