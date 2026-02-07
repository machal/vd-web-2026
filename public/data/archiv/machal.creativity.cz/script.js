function cesky_datum(d) {
// c0d3d by nn at rtfm dot cz
// p4tch by Lukas Oborsky and Martin Kopta

  d = d.replace(/Monday/, "pondìlí");
  d = d.replace(/Tuesday/, "úterý");
  d = d.replace(/Wednesday/, "støeda");
  d = d.replace(/Thursday/, "ètvrtek");
  d = d.replace(/Friday/, "pátek");
  d = d.replace(/Saturday/, "sobota");
  d = d.replace(/Sunday/, "nedìle");
  d = d.replace(/January/, "ledna");
  d = d.replace(/February/, "února");
  d = d.replace(/March/, "bøezna");
  d = d.replace(/April/, "dubna");
  d = d.replace(/May/, "kvìtna");
  d = d.replace(/June/, "èervna");
  d = d.replace(/July/, "èervence");
  d = d.replace(/August/, "srpna");
  d = d.replace(/September/, "záøí");
  d = d.replace(/October/, "øíjna");
  d = d.replace(/November/, "listopadu");
  d = d.replace(/December/, "prosince");	
  
  d = d.replace(/^([^,]+), ([^,]+) ([0-9]+), ([0-9]+)$/, "$1 $3\. $2 $4");
  d = d.replace(/ 0/," ");
  document.write(d);
  return true;

}