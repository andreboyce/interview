: 'Fibonacci Recursive'
f_r()
{
   local n=$1
   if [ $n = 0 ]
   then
      echo 0
   elif [ $n = 1 ]
   then
      echo 1
   else
      echo $(( $(f_r $((n-1))) + $(f_r $((n-2))) ))
   fi
}

: 'Fibonacci Iterative'
f_i()
{
   local n=$1
   if [ $n = 0 ]
   then
      echo 0
   elif [ $n = 1 ]
   then
      echo 1
   else

      local fnm1=1;
      local fnm2=0;
      local fn=1;
      local nfn=0;

      for (( i=0; i<$((n-1)) ; i++ ))
      do
         nfn=$((fnm1+fnm2))
         fnm2=$fnm1;
         fnm1=$nfn;
      done
      echo "$nfn"
   fi
}

echo "$(f_r 12)"
echo "$(f_i 12)"
