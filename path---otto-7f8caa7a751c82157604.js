webpackJsonp([0xc6617f9b22cd],{485:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Dev Notes",author:"Alexey Sadykov"}},markdownRemark:{id:"/Users/fixer/Sources/fixerteam/src/pages/otto/index.md absPath of file >>> MarkdownRemark",html:'<p>Очередная библиотека от <a href="http://square.github.io/">Square</a> для удобного взаимодействия между компонентами приложения, разработанная специально для Android платформы. Реализует паттерн <a href="https://ru.wikipedia.org/wiki/%D0%98%D0%B7%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%87%D0%B8%D0%BA_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)">Publish–subscribe</a>. Android сообщество не рекомендует использовать Event Bus, так как данное решение довольно противоречиво и напоминает небезызвестную конструкцию go to. Если же вы все же решили воспользоваться такой возможностью, то рассмотрим базовую настройку Otto:\nПодключаем зависимости в build.gradle</p>\n<div class="gatsby-highlight">\n      <pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>\n   compile <span class="token string">\'com.squareup:otto:1.3.8\'</span>\n <span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>По умолчанию Otto работает в UiThread и выбрасывает исключение <code>IllegalStateException("Event bus accessed from non-main thread")</code>. Если требуется использовать event-ы в многопоточной среде, в конструктор добавьте <code>ThreadEnforcer.ANY</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code><span class="token comment">// в случае singleton</span>\nBus otto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// в случае, когда требуются несколько объектов</span>\nBus otto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token string">"id_event_bus"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// в случае, когда требуются multithread event-ы</span>\nBus otto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span>ThreadEnforcer<span class="token punctuation">.</span>ANY<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// в случае, когда требуются разные объекты для multithread event-ов</span>\nBus otto <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span>ThreadEnforcer<span class="token punctuation">.</span>ANY<span class="token punctuation">,</span> <span class="token string">"id_event_bus"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Разработчики рекомендуют использовать singleton реализацию, либо инъектить с помощью DI (например <a href="http://google.github.io/dagger/">Dagger 2</a>).\nДля того, чтобы послать event, пишем следующий код:</p>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code>otto<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">"Какой то event"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Для того, чтобы принять данный event, необходимо зарегистрироваться для приема event-ов:</p>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code>otto<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Раз есть возможность подписаться, то должна быть и отписка. Старайтесь не забывать об этом, чтобы не было неожиданных event-ов:</p>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code>otto<span class="token punctuation">.</span><span class="token function">unregister</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Для обработки event-а вешаем аннотацию <code>@Subscribe</code> на тело метода и в качестве параметра метода указываем переменную с необходимым типом:</p>\n<div class="gatsby-highlight">\n      <pre class="language-java"><code><span class="token annotation punctuation">@Subscribe</span> <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">onStringEvent</span><span class="token punctuation">(</span>String message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> message<span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Если в вашем проекте используется proguard (если же нет, то стоит задуматься об этом), добавьте в <code>proguard-project.txt</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-markup"><code>-keepattributes *Annotation*\n-keepclassmembers class ** {\n    @com.squareup.otto.Subscribe public *;\n    @com.squareup.otto.Produce public *;\n}\n</code></pre>\n      </div>\n<p>Полный код примера всегда можно найти на <a href="https://github.com/square/otto">GitHub</a> данной библиотеки</p>',frontmatter:{title:"Otto",date:"July 29, 2016"}}},pathContext:{slug:"/otto/",previous:!1,next:{fields:{slug:"/leakcanary/"},frontmatter:{title:"LeakCanary"}}}}}});
//# sourceMappingURL=path---otto-7f8caa7a751c82157604.js.map