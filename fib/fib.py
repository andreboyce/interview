# Fibonacci recursive
def f_r( n ):
   if( n == 0 ): return 0
   if( n == 1 ): return 1
   return f_r(n-1)+f_r(n-2)

# Fibonacci iterative
def f_i( n ):
   if( n == 0 ): return 0
   if( n == 1 ): return 1

   fnm1 = 1
   fnm2 = 0
   fn   = 1
   nfn  = 0

   for i in range((n-1)):
      nfn = fnm1 + fnm2
      fnm2 = fnm1
      fnm1 = nfn

   return nfn
