#include <iostream>

using namespace std;

    // Fibonacci recursive
    int f_r( int n )
    {
       if( n == 0 ) return 0;
       if( n == 1 ) return 1;
       return f_r(n-1)+f_r(n-2);
    }

    // Fibonacci iterative
    int f_i( int n )
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

int main()
{
    int r = f_r( 12 );
    int i = f_i( 12 );
    cout << "r: " << r;
    cout << "\r\n";
    cout << "i: " << i;

    return 0;
}
</iostream>
