public class Main
{
    public static void main(String[] args) {
        System.out.println( f_r( 10 ) );
        System.out.println( f_i( 10 ) );
    }

    // Fibonacci recursive
    public static int f_r( int n )
    {
       if( n == 0 ) return 0;
       if( n == 1 ) return 1;
       return f_r(n-1)+f_r(n-2);
    }

    // Fibonacci iterative
    public static int f_i( int n )
    {
       if( n == 0 ) return 0;
       if( n == 1 ) return 1;
       int fnm1 = 1;
       int fnm2 = 0;
       int fn   = 1;
       int nfn  = 0;
       for( int i=1 ; (i<=(n-1)) ; i++ )
       {
          nfn = fnm1 + fnm2;
          fnm2 = fnm1;
          fnm1 = nfn;
       }
       return nfn;
    }

}
