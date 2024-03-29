/*jshint eqnull:true, expr:true*/

var _ = { };

(function () {

	/**
	 * COLLECTIONS
	 * ===========
	 *
	 * In this section, we'll have a look at functions that operate on collections
	 * of values; in JavaScript, a 'collection' is something that can contain a
	 * number of values--either an array or an object.
	 */

		// Return an array of the first n elements of an array. If n is undefined,
		// return just the first element.
	_.first = function ( array, n ) {
		if ( n == undefined ) {
			return array[0];
		} else {
			return array.slice( 0, n );
		}
	};

	// Like first, but for the last elements. If n is undefined, return just the
	// last element.
	_.last = function ( array, n ) {
		if ( n == undefined ) {
			return array.slice( -1 )[0];
		} else {
			if ( n > 0 ) {
				return array.slice( -n )
			} else {
				return [];
			}
		}
	};

	// Call iterator(value, key, collection) for each element of collection.
	// Accepts both arrays and objects.
	_.each = _.forEach = function ( collection, iterator, context ) {
		if ( collection === null ) {
			return;
		}
		if ( Object.prototype.toString.call( collection ) === '[object Array]' ) {
			if ( Array.prototype.forEach ) {
				return collection.forEach( iterator, context );
			}
			for ( var i = 0; i < collection.length; i++ ) {
				iterator.call( context, collection[i], i, collection );
			}
		} else {
			for ( var p in collection ) {
				iterator.call( context, collection[p], p, collection );
			}
		}
	};

	// Returns the index at which value can be found in the array, or -1 if value
	// is not present in the array.
	_.indexOf = function ( array, target ) {
		var match = -1;
		// TIP: Here's an example of a function that needs to iterate, which we've
		// implemented for you. Instead of using a standard `for` loop, though,
		// it uses the iteration helper `each`, which you will need to write.
		_.each( array, function ( arrayVal, idx ) {
			if ( match < 0 && arrayVal === target ) {
				match = idx;
			}
		} );
		return match;
	};

	// Return all elements of an array that pass a truth test.
	_.filter = _.select = function ( collection, iterator ) {
		var result = [];
		_.each( collection, function ( item ) {
			if ( iterator( item ) ) {
				result.push( item );
			}
		} );
		return result;
	};

	// Return all elements of an array that don't pass a truth test.
	_.reject = function ( collection, iterator ) {
		// TIP: see if you can re-use _.select() here, without simply
		// copying code in and modifying it
		return _.select( collection, function ( item ) {
			return !iterator( item );
		} );
	};

	// Produce a duplicate-free version of the array.
	_.uniq = function ( array ) {
		var result = [];
		_.forEach( array, function ( item ) {
			if ( _.indexOf( result, item ) < 0 ) {
				result.push( item );
			}
		} );
		return result;
	};

	// Return the results of applying an iterator to each element.
	_.map = function ( array, iterator ) {
		var result = [];
		// map() is a useful primitive iteration function that works a lot
		// like each(), but in addition to running the operation on all
		// the members, it also maintains an array of results.
		_.forEach( array, function ( item ) {
			result.push( iterator( item ) );
		} );
		return result;
	};

	/*
	 * TIP: map is really handy when you want to transform an array of
	 * values into a new array of values. _.pluck() is solved for you
	 * as an example of this.
	 */

	// Takes an array of objects and returns and array of the values of
	// a certain property in it. E.g. take an array of people and return
	// an array of just their ages
	_.pluck = function ( array, propertyName ) {
		// TIP: map is really handy when you want to transform an array of
		// values into a new array of values. _.pluck() is solved for you
		// as an example of this.
		return _.map( array, function ( value ) {
			return value[propertyName];
		} );
	};

	// Calls the method named by methodName on each value in the list.
	_.invoke = function ( list, methodName, args ) {
		// TODO: double check handling of args
		var result = [];
		args = args || [];
		if ( typeof methodName === 'string' ) {
			_.forEach( list, function ( item ) {
				result.push( item[methodName].apply( item, args ) );
			} );
		} else {
			_.forEach( list, function ( item ) {
				result.push( methodName.apply( item, args ) );
			} );
		}
		return result;
	};

	// Reduces an array or object to a single value by repetitively calling
	// iterator(previousValue, item) for each item. previousValue should be
	// the return value of the previous iterator call.
	//
	// You can pass in an initialValue that is passed to the first iterator
	// call. Defaults to 0.
	//
	// Example:
	//   var numbers = [1,2,3];
	//   var sum = _.reduce(numbers, function(total, number){
	//     return total + number;
	//   }, 0); // should be 6
	//
	_.reduce = function ( collection, iterator, initialValue ) {
		var result = initialValue || 0;

		_.forEach( collection, function ( item ) {
			result = iterator( result, item );
		} );

		return result;
	};

	// Determine if the array or object contains a given value (using `===`).
	_.contains = function ( collection, target ) {
		// TIP: Many iteration problems can be most easily expressed in
		// terms of reduce(). Here's a freebie to demonstrate!
		return _.reduce( collection, function ( wasFound, item ) {
			if ( wasFound ) {
				return true;
			}
			return item === target;
		}, false );
	};

	// Determine whether all of the elements match a truth test.
	_.every = function ( collection, iterator ) {
		var result;

		// TIP: Try re-using reduce() here
		if ( iterator && typeof iterator === 'function' ) {
			result = _.reduce( collection, function ( result, item ) {
				return  result && iterator( item );
			}, true );
		} else {
			result = _.reduce( collection, function ( result, item ) {
				return result && item;
			}, true );
		}
		return result ? true : false;
	};

	// Determine whether any of the elements pass a truth test. If no iterator is
	// provided, provide a default one
	_.some = function ( collection, iterator ) {
		// TIP: There's a very clever way to re-use every() here.
		return !(
			_.every( collection, function ( item ) {
				return iterator ? !iterator( item ) : !item;
			} )
			);
	};

	/**
	 * OBJECTS
	 * =======
	 *
	 * In this section, we'll look at a couple of helpers for merging objects.
	 */

		// Extend a given object with all the properties of the passed in
		// object(s).
		//
		// Example:
		//   var obj1 = {key1: "something"};
		//   _.extend(obj1, {
		//     key2: "something new",
		//     key3: "something else new"
		//   }, {
		//     bla: "even more stuff"
		//   }); // obj1 now contains key1, key2, key3 and bla
	_.extend = function ( obj ) {
		var argArray = Array.prototype.splice.call( arguments, 1 )
		_.forEach( argArray, function ( arg ) {
			_.forEach( arg, function ( value, prop ) {
				obj[prop] = value;
			} );
		} )
		return obj;
	};

	// Like extend, but doesn't ever overwrite a key that already
	// exists in obj
	_.defaults = function ( obj ) {
		var argArray = Array.prototype.splice.call( arguments, 1 )
		_.forEach( argArray, function ( arg ) {
			_.forEach( arg, function ( value, prop ) {
				if ( !obj.hasOwnProperty( prop ) ) {
					obj[prop] = value;
				}
			} );
		} )
		return obj;
	};

	/**
	 * FUNCTIONS
	 * =========
	 *
	 * Now we're getting into function decorators, which take in any function
	 * and return out a new version of the function that works somewhat differently
	 */

		// Return a function that can be called at most one time. Subsequent calls
		// should return the previously returned value.
	_.once = function ( func ) {
		// TIP: These variables are stored in a "closure scope" (worth researching),
		// so that they'll remain available to the newly-generated function every
		// time it's called.
		var alreadyCalled = false;
		var result;
		// TIP: We'll return a new function that delegates to the old one, but only
		// if it hasn't been called before.
		return function () {
			if ( !alreadyCalled ) {
				// TIP: .apply(this, arguments) is the standard way to pass on all of the
				// infromation from one function call to another.
				result = func.apply( this, arguments );
				alreadyCalled = true;
			}
			// The new function always returns the originally computed result.
			return result;
		};
	};

	// Memoize an expensive function by storing its results. You may assume
	// that the function takes only one argument and that it is a primitive.
	//
	// Memoize should return a function that when called, will check if it has
	// already computed the result for the given argument and return that value
	// instead if possible.
	_.memoize = function ( func ) {
		// TODO: THIS AIN'T RIGHT....NEED TO REVISIT
		var cache = [], res;
		return function ( param ) {
			if ( cache[param] !== undefined ) {
				return cache[param];
			} else {
				res = func( param )
				cache.push( res );
				return res;
			}
		}
	};

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	//
	// The arguments for the original function are passed after the wait
	// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
	// call someFunction('a', 'b') after 500ms
	_.delay = function ( func, wait ) {
		var argArray = Array.prototype.slice.call( arguments, 2 );
		setTimeout( function () {
			func.apply( null, argArray );
		}, wait );
	};

	/**
	 * ADVANCED COLLECTION OPERATIONS
	 * ==============================
	 */

		// Shuffle an array.
	_.shuffle = function ( array ) {
		var len = array.length, result = _.map( array, function ( v ) {
			return v
		} );
		for ( var i = len - 1, j, temp; i > 0; i-- ) {
			j = Math.round( Math.random() * i );
			temp = result[i];
			result.splice( i, 1, result[j] );
			result.splice( j, 1, temp );
		}
		return result;
	};

	/**
	 * Note: This is the end of the pre-course curriculum. Feel free to continue,
	 * but nothing beyond here is required.
	 */

		// Sort the object's values by a criterion produced by an iterator.
		// If iterator is a string, sort objects by that property with the name
		// of that string. For example, _.sortBy(people, 'name') should sort
		// an array of people by their name.
	_.sortBy = function ( collection, iterator ) {
		var result;
		if ( typeof iterator === 'string' ) {
			result = collection.sort( function ( a, b ) {
				return a[iterator] > b[iterator];
			} );
		} else {
			result = collection.sort( function ( a, b ) {
				return  iterator( a ) > iterator( b );
			} );
		}
		return result;
	};

	// Zip together two or more arrays with elements of the same index
	// going together.
	//
	// Example:
	// _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
	_.zip = function () {

		var argArray = Array.prototype.slice.call( arguments );
		var maxLength = Math.max.apply( null, _.map( argArray, function ( item ) {
			return item.length;
		} ) ), result = [];

		for ( j = 0; j < argArray.length; j++ ) {
			// TODO - this seems very clunky. Need to think of a better way.
			result.push( [] );
		}
		for ( var i = 0; i < maxLength; i++ ) {
			for ( var j = 0; j < argArray.length; j++ ) {
				result[j].splice( i, 0, argArray[i][j] )
			}
		}
		return result;
	};

	// Takes a multidimensional array and converts it to a one-dimensional array.
	// The new array should contain all elements of the multidimensional array.
	//
	// Hint: Use Array.isArray to check if something is an array
	_.flatten = function ( nestedArray ) {
		var res = [];
		_.each( nestedArray, function iter ( item ) {
			if ( Array.isArray( item ) ) {
				_.each( item, function ( e ) {
					iter.call( this, e );
				}, this );
			} else {
				this.push( item );
			}
		}, res );
		return res;
	};

	// Takes an arbitrary number of arrays and produces an array that contains
	// every item shared between all the passed-in arrays.
	_.intersection = function () {
		var argArray = Array.prototype.slice.call( arguments, 0,
			1 )[0], refArray = Array.prototype.slice.call( arguments, 1 );

		return _.filter( argArray, function ( val ) {
			return _.every( refArray, function ( item ) {
				return _.indexOf( item, val ) > -1;
			} );
		} );
	};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	_.difference = function ( array ) {
		var argArray = Array.prototype.slice.call( arguments, 0,
			1 )[0], refArray = Array.prototype.slice.call( arguments, 1 );

		return _.filter( argArray, function ( val ) {
			return _.every( refArray, function ( item ) {
				return _.indexOf( item, val ) === -1;
			} );
		} );
	};

	// Bind a function so that it is always called in the given context
	// func() will be equivalent to context.func()
	_.bind = function ( func, context ) {

		return function ( args ) {
			if ( Array.isArray( args ) ) {
				return func.apply( context, args );
			} else {
				return func.call( context, args );
			}
		}
	}

	/**
	 * MEGA EXTRA CREDIT
	 * =================
	 */

		// Returns a function, that, when invoked, will only be triggered at most once
		// during a given window of time.
		//
		// See the Underbar readme for details.
	_.throttle = function ( func, wait ) {

		var lastRun = 0, timer = null, timerExpirationTime, result;

		return function () {
			var now = Date.now();
			if ( (now - lastRun) > wait ) {
				lastRun = Date.now();
				result = func( arguments );
				return result;
			} else {
				if ( !timer ) {
					timerExpirationTime = wait - (lastRun - now);
				} else {
					timerExpirationTime += wait;
				}
				timer = setTimeout( arguments.callee, timerExpirationTime );
				return result;
			}
		};
	};

}).call( this );
