Tests in Browsers
=================
Results of `test/index.html` runs in various browsers and environments. Grouped by browser. Including shortened browser signatures.

Summary - 8 out of 9
--------------------
Both manual and automated tests indicate, that Reel is easily compatible with everything - nearly.
From an array of 9 browsers Reel fails in just one case, in mobile Opera Mini. See [FAQ][FAQ] for explanation.
I could as well leave out this JavaScript-disabled browser completely to have it look like Reel is 100% compatible, but let's leave it there for transparency's sake.

Statistics
----------
Between last version update (1.0 » 1.1), the test coverage has been **improved by 361%**. We now have 162 tests in 39 tasks and 8 modules in version 1.1 as opposed to 34 tests in 19 tasks and 4 modules back in 1.0.4.

Results
-------

### Chrome
* **OK** -- `Mozilla/5.0 (Windows; U; Windows NT 5.1) AppleWebKit/533.4 Chrome/5.0.375.125 Safari/533.4`
* **OK** -- `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8) AppleWebKit/533.4 Chrome/5.0.375.125 Safari/533.4`

### Firefox
* **OK** -- `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; rv:1.9.0.10) Gecko/2009042315 Firefox/3.0.10`

### Interner Explorer
* **OK** -- `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 3.5.30729)`
* **OK** -- `Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 3.5.30729)`
* **OK** -- `Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 3.5.30729)`
	* I had experienced slightly longer timer ticks in IE 6, but that could well be caused by running my Windows on a virtual machine.

### WebKit
* **OK** -- `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8) AppleWebKit/531.5+ Version/4.0.5 Safari/531.22.7`

### Safari
* **OK** -- `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8) AppleWebKit/531.22.7 Version/4.0.5 Safari/531.22.7`

### Safari (mobile)
* **OK** -- `Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 3_0) AppleWebKit/528.18 Version/4.0 Mobile/7A341 Safari/528.16`

### Opera
* **OK** -- `Opera/9.80 (Macintosh; Intel Mac OS X; U) Presto/2.2.15 Version/10.10`

### Opera Mini (mobile)
* **FAIL** -- `Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.18697/19.892; U) Presto/2.5.25`
	* See [FAQ][FAQ] for information why this particular browser fails

### Camino
* **OK** -- `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; rv:1.9.0.19) Gecko/2010051911 Camino/2.0.3`
* **OK** -- `Mozilla/5.0 (Macintosh; U; Intel Mac OS X; rv:1.8.1.23) Gecko/20090925 Camino/1.6.10`
	* Half of the time the timer ticks run a little longer

Missing some?
-------------
Do you have a test suite run result not listed here? Send it to [me][pisi] (_Petr Vostřel_) along with the signature found at the top of the QUnit test page. I will happily add it here.
Or you can always fork the project and commit the updated file.

[FAQ]:http://wiki.github.com/pisi/Reel/faq
[pisi]:mailto:petr@vostrel.cz