/**
* Will fill a textarea with an array of randomly seperated strings.
* @param {string} textarea_id - textarea field id.
*/
function generate( textarea_id )
{
   var string_length = document.getElementById( 'string_length' ).value;
   var number_of_strings = document.getElementById( 'number_of_strings' ).value;
   var string_seperator = document.getElementById( 'string_seperator' ).value;
   var range = document.getElementById( 'range' ).value;
   var input_string_array = generate_array_of_random_strings( number_of_strings, string_length, range );
   document.getElementById( textarea_id ).value = input_string_array;
}

/**
* Will call compare_string_arrays using the values obtained from textareas if1 and if2
* and update gui components
*/
function compare()
{
   var input_string1 = document.getElementById('if1').value;
   var input_string2 = document.getElementById('if2').value;

   var input_string_array1 = input_string1.split( "," );
   var input_string_array2 = input_string2.split( "," );

   let result = compare_string_arrays( input_string_array1, input_string_array2 );

   var common_items = result[2];
   var output_string_array1 = result[0];
   var output_string_array2 = result[1];

   document.getElementById('of1').value                    = output_string_array1;
   document.getElementById('of2').value                    = output_string_array2;
   document.getElementById('common').value                 = [...common_items].join( ',' );
   document.getElementById("common_elements_length").value = common_items.size;
   document.getElementById("output_file1_length").value    = output_string_array1.length;
   document.getElementById("output_file2_length").value    = output_string_array2.length;
}

/**
* Will compare two textareas and produce two outputs
* first output should contain only strings which were found in first textarea, but not in the second one;
* second output should contain only strings which were found in the second textarea, but not in the first one.
* @param {array} input_string_array1 - array of strings.
* @param {array} input_string_array2 - array of strings.
* @returns {array} {array} output_string_array1 , {array} output_string_array1 , {set} common_items
*/
function compare_string_arrays( input_string_array1, input_string_array2 )
{
   /*
      lista 
      listb 
      listc common elements

      loop:
      with lista
      get next element
      if next element undefined break loop
      if element in listb
      add to listc
      goto loop
      remove elements in listc from lista
      remove elements in listc from listb
   */

   var t0 = performance.now();

   // in Javascript Set is bascially a distinct array, each item only shows up once
   //var common_items = new Set();

   /*
   // method a
   // appears to be ~14% faster than method b
   // uses a set to avoid a .find() call on input_string_array2
   var counter = 0;
   var input_string_set1 = new Set();
   for( let i=0; i<input_string_array1.length; i++ )
   {
      // check if we have seen this string before
      if( input_string_set1.has( input_string_array1[i] ) )
         //if yes next loop
         continue;
      else
         // if we have not seen this string before add it to the strings we have seen before set
         input_string_set1.add( input_string_array1[i] );

      counter++;

      // check if this string exists input_string_array2
      if( input_string_array1[i] === input_string_array2.find( ( element )=>{ return element === input_string_array1[i] } ) )
         // if its found add it to common items
         common_items.add( input_string_array1[i] );
   }
   //console.log( "counter: " + counter );
   */

   /*
   // method b
   // Slower way does not use a set for input_string_array1
   // calls find on input_string_array2 input_string_array1.length times
   var counter = 0;
   for( let i=0; i<input_string_array1.length; i++, counter++ )
   {
      if( input_string_array1[i] === input_string_array2.find( ( element )=>{ return element === input_string_array1[i] } ) )
      {
         common_items.add( input_string_array1[i] );
      }
   }
   //console.log( "counter: " + counter );
   */

   // method c
   // way faster than both a and b
   // find the intersection of 2 sets
   var input_string_set2 = new Set([...input_string_array2]);
   var common_items = new Set( [...input_string_array1].filter( x=> input_string_set2.has(x) ) ); // intersection of the 2 sets

   var t1 = performance.now();
   console.log( "Call took " + (t1 - t0) + " milliseconds." );

   var output_string_array1 = deleteitems( input_string_array1, common_items );
   var output_string_array2 = deleteitems( input_string_array2, common_items );

   var result = new Array( output_string_array1, output_string_array2, common_items );
   return result;
}

/**
* Will fill a textarea with an array of randomly seperated strings.
* @param {array} items - array of strings.
* @param {array} items_to_delete - array of elements that will be deleted from items if found.
*/
function deleteitems( items, items_to_delete )
{
   for( var i = 0; i < items.length; i++ )
   {
      if ( items_to_delete.has( items[i] ) )
      {
         items.splice(i, 1);
         i--;
      }
   }
   return items;
}

/**
* Will generate a random ASCII string.
* @param {array} string_length - length of output string.
* @param {array} range - ASCII 97 to 97 + range would be the range of charcters.
*/
function generate_random_string( string_length, range = 25 )
{
   let random_string = '';
   let random_ascii;
   for(let i = 0; i < string_length; i++)
   {
      random_ascii = Math.floor((Math.random() * range) + 97);
      random_string += String.fromCharCode(random_ascii)
   }
   return random_string;
}

/**
* Will generate an array of random ASCII strings.
* @param {array} number_of_strings - number of strings to generate.
* @param {array} string_length - the length of each string.
*/
function generate_array_of_random_strings( number_of_strings = 100, string_length = 3, range = 3 )
{
   var string_array = new Array();
   for( let i = 0; i < number_of_strings; i++ )
   {
      string_array.push( generate_random_string( string_length, range ) );
   }
   string_array.sort();
   return string_array;
}

/**
* Saves a .txt text file from from the contents of a textarea.
* @param {string} textarea_id - textarea field id.
*/
function download( textarea_id )
{
   //console.log( "textarea_id: " + textarea_id );
   var text = document.getElementById( textarea_id ).value;
   text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
   var blob = new Blob([text], { type: "text/plain"});
   var anchor = document.createElement("a");
   anchor.download = textarea_id+".txt";
   anchor.href = window.URL.createObjectURL(blob);
   anchor.target ="_blank";
   anchor.style.display = "none";
   document.body.appendChild(anchor);
   anchor.click();
   document.body.removeChild(anchor);
}

/**
* Loads a text file from local machine into a textarea.
* @param {string} id - input or textarea field id.
*/
function loadfile( textarea_id, file_id )
{
   var file = document.getElementById( file_id ).files[0];
   var reader = new FileReader();
   reader.onload = function (e)
   {
      var textarea = document.getElementById( textarea_id );
      textarea.value = e.target.result;
   };
   reader.readAsText(file);
}

/**
* Resets all the Textareas, Files and Inputs.
*/
function reset()
{
   document.getElementById( 'string_length' ).value = "4";
   document.getElementById( 'number_of_strings' ).value = "100";
   document.getElementById( 'string_seperator' ).value = ',';
   document.getElementById( 'range' ).value = "3";
   document.getElementById( 'if1' ).value = "";
   document.getElementById( 'if2' ).value = "";
   document.getElementById( 'common_elements_length' ).value = "";
   document.getElementById( 'common' ).value = "";
   document.getElementById( 'of1' ).value = "";
   document.getElementById( 'of2' ).value = "";
   document.getElementById( 'output_file1_length' ).value = "";
   document.getElementById( 'output_file2_length' ).value = "";
   document.getElementById( 'file1' ).value = "";
   document.getElementById( 'file2' ).value = "";
}
