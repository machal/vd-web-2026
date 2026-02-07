<script async>
// Ne-SVG prohlizece: nahrazujeme .svg -> .png
if (!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
  var imgs = document.getElementsByTagName('img');
  var endsWithDotSvg = /.*\.svg$/
  var i = 0;
  var l = imgs.length;
  for(; i != l; ++i) {
      if(imgs[i].src.match(endsWithDotSvg)) {
          imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
      }
  }
}
</script>

<script src="../dist/js/script.js"></script>

<!-- pro debugování selectů, vybere všem hodnotu -->
<!--<script> $('select option').each(function(){$(this).attr("selected","selected");}) </script>-->

</body>

</html>
