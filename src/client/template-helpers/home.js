Template._loggedInHeader.events( {
  'click [data-action=logout]' : function ( e ) {
    e.preventDefault();
    
    Meteor.logout();
  }
} );