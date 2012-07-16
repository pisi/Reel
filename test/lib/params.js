( function(){

  // URL Params Hash
  //--------------------------------------------------------------------------------
  // (cc) 2011-2012 Petr Vostrel, MIT / GPL license
  //
  // Automatically parses URL search query string and makes all the parameters
  // readily available in newly created `window.location.params` hash.
  //
  // Naked params starting (or not) with a `+` (plus) become boolean `true`
  // and on the contrary those starting with `-` (minus) become boolean `false`.
  // Otherwise values are always strings.
  //
  var
    query= window.location.search.replace(/^\?/, '').split(/&/),
    params= {}

  for( var i= 0; i < query.length; i++){
    var
      param= query[ i ].split(/=/),
      name= param[ 0 ],
      value= param[ 1 ]

    if( value === undefined )
      if( /^\-/.test(name) ) value= false
      else value= true;

    params[ name ]= value;
  }
  return window.location.params= params;
  //
  //--------------------------------------------------------------------------------

} )();
