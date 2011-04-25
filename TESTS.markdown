Tests in Browsers
=================

Results of `test/index.html` runs in various browsers and environments. Grouped by browser. Including shortened browser signatures.


Summary - 8 out of 9
--------------------

Both manual and automated tests indicate, that Reel is easily compatible with everything - nearly.
From an array of 9 browsers Reel fails in just one case, in mobile Opera Mini. See [FAQ][FAQ] for explanation.
I could as well leave out this JavaScript-disabled browser completely to have it look like Reel is 100% compatible, but let's leave it here to be fair.


Statistics
----------

Between releases (1.1.1 and 1.1.2), the unit test coverage has been **improved by 73%**. We now have 246 tests in 58 tasks and 9 modules.


Desktop-class
-------------

### Chrome

* `Mozilla/5.0 (Windows; U; Windows NT 5.1) AppleWebKit/533.4 Chrome/5.0.375.125 Safari/533.4`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5) AppleWebKit/534.16 Chrome/10.0.648.205 Safari/534.16`
  * **OK** -- Unit
  * **OK** -- Interaction


### Firefox

* `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0`
  * **OK** -- Unit
  * **OK** -- Interaction
  * Firefox 4 reports 0px background shift as 0% which doesn't affect function.
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16`
  * **OK** -- Unit
  * **OK** -- Interaction


### Interner Explorer

* `Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; Media Center PC 6.0)`
  * **OK** -- Unit
  * **OK** -- Interaction
  * IE 9 reports color as rgb not in hex without affecting function.
* `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)`
  * **OK** -- Unit
  * **OK** -- Interaction


### Safari / WebKit

* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5) AppleWebKit/533.18.1 Version/5.0.2 Safari/533.18.5`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8) AppleWebKit/531.22.7 Version/4.0.5 Safari/531.22.7`
  * **OK** -- Unit
  * **OK** -- Interaction


### Opera

* `Opera/9.80 (Macintosh; Intel Mac OS X; U) Presto/2.2.15 Version/10.10`
  * **OK** -- Unit
  * **OK** -- Interaction


### Camino
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.0.19) Gecko/2010111021 Camino/2.0.6`
  * **OK** -- Unit
  * **OK** -- Interaction


Mobile-class
------------

Unles noted otherwise mobile browsers are tested using their respective emulator software running on MacOSX 10.5.8.


### Safari

* `Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X) AppleWebKit/533.17.9 Version/5.0.2 Mobile/8C148 Safari/6533.18.5`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 3_0) AppleWebKit/528.18 Version/4.0 Mobile/7A341 Safari/528.16`
  * **OK** -- Unit
  * **OK** -- Interaction


### Opera Mobile

* `Opera/9.80 (Macintosh; Intel Mac OS X; Opera Mobi/27; U) Presto/2.4.18 Version/10.00`
  * **OK** -- Unit
  * **FAIL** -- Interaction


### Opera Mini

* `Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.18697/19.892; U) Presto/2.5.25`
  * **FAIL** -- Unit
  * **FAIL** -- Interaction
  * See [FAQ][FAQ] for information why this particular "browser" fails


### Fennec

* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; rv:1.9.1b2pre) Gecko/20081015 Fennec/1.0a1`
  * **OK** -- Unit
  * **FAIL** -- Interaction


Missing some?
-------------
Do you have a test suite run result not listed here? Send it to [me][pisi] (_Petr Vostřel_) along with the signature found at the top of the QUnit test page. I will happily add it here.
Or you can always fork the project and commit the updated file.



[FAQ]:http://wiki.github.com/pisi/Reel/faq
[pisi]:mailto:petr@vostrel.cz
