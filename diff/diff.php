<?php

   function compare_string_arrays( $input_string_array1, $input_string_array2 )
   {
      $input_string_set1 = new \Ds\Set( $input_string_array1 );
      $input_string_set2 = new \Ds\Set( $input_string_array2 );
      $intersection = $input_string_set1->intersect( $input_string_set2 );

      $output_string_set1 = $input_string_set1->diff( $intersection );
      $output_string_set2 = $input_string_set2->diff( $intersection );
      $result_array = [$output_string_set1, $output_string_set2, $intersection];

      return $result_array;
   }

   $string_array1 = ['aaa','bbb','ccc'];
   $string_array2 = ['aaa','ddd','ccc'];
   $result_array = compare_string_arrays( $string_array1, $string_array2 );
   echo "Array1 Input: " . implode( " ", $string_array1 ) . "<br/>";
   echo "Array2 Input: " . implode( " ", $string_array2 ) . "<br/>";

   echo "Array1 Output: " . implode( " ", $result_array[0]->toArray() ) . "<br/>";
   echo "Array2 Output: " . implode( " ", $result_array[1]->toArray() ) . "<br/>";
   echo "Common: " . implode( " ", $result_array[2]->toArray() ) . "<br/>";

?>
