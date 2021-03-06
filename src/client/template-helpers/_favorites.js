Template._favorites.onRendered(function () {
  /*
   * Hack to fix scroll on Chrome on Windows.
   * Version 40.0.2214.111 m
   */

  var $list = $( '#favorite-list .list' );
  var pos = $list.css( 'position' );

  if ( pos === 'absolute' ) {
    $list.css( 'position', 'static' );
  } else {
    $list.css( 'position', 'absolute' );
  }
  
  setTimeout( function () {
    $list.css( 'position', pos );
  }, 100 );
});

Template._favorites.helpers( {
  favorites : function () {
    return Favorites.find();
  },
  noFavorites : function () {
    return Favorites.find().fetch().length === 0;
  }
} );

Template._favorites.events( {
  'click [data-action=navigate]' : function ( e ) {
    e.preventDefault();
    IonModal.close();

    Router.go( '/fontcombo' + '#' + this.headingSlug + '+' + this.bodySlug );
  },
  /**
   * Not used
   */
  'click [data-action=delete]' : function ( e ) {
    e.preventDefault();

    Meteor.call(
      'unFavorite',
      this.headingSlug,
      this.bodySlug,
      function ( error ) {
        if ( error ) {
          alert( error.reason );
        }
      }
    );
  }
} );