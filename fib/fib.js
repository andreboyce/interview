// Fibonacci recursive
function f_r( n )
{
   if( n == 0 ) return 0;
   if( n == 1 ) return 1;
   return f_r(n-1)+f_r(n-2);
}

// Fibonacci iterative
function f_i( n )
{
   if( n == 0 ) return 0;
   if( n == 1 ) return 1;

   var fnm1 = 1;
   var fnm2 = 0;
   var fn   = 1;
   var nfn  = 0;
   for( var i=1 ; (i<=(n-1)) ; i++ )
   {
      nfn = fnm1 + fnm2;
      fnm2 = fnm1;
      fnm1 = nfn;
   }

   return nfn;
}
