/**
 * @license
 * Pagoda
 *
 * Copyright 2016 James Crook
 * https://github.com/jamescrook/pagoda/
 *
 * License terms will be added later.  For now, all (valid) rights reserved.
 */

/**
 * @fileoverview provides 2d vector functions.  This file should contain
 * only clean mathematical abstractions - vectors, matrices, angles,
 * transforms.   Code that makes shapes or moves objects around on the
 * screen (in particular code that transfers to/from positions on the
 * screen) should, for example, live with the shapes' or objects' code.
 *
 * @author james.k.crook@gmail.com (James Crook)
 */
'use strict';

/**
 * Constructor for a vector.
 * @param x
 * @param y
 * @returns {Vec2}
 * @constructor
 */
function Vec2(x, y){
  if( !(this instanceof Vec2) ){
    return new Vec2(x, y);
  }
  this._vector = [x, y];
}
function polarVec( r, theta ){
  var thetaRad = (Math.PI / 180 ) * theta;
  return Vec2( r * Math.cos( thetaRad) , r * Math.sin( thetaRad ) );
}

//------------------ Standard vector functions ----------------------------
// These do exactly what you would expect, so individual comments would get
// in the way.
Vec2.prototype.copy = function(){ return Vec2( this.x(), this.y() );};
Vec2.prototype.x = function(){ return this._vector[0];};
Vec2.prototype.y = function(){ return this._vector[1];};
Vec2.prototype.setX = function(x){ this._vector[0] = x;};
Vec2.prototype.setY = function(y){ this._vector[1] = y;};
Vec2.prototype.add = function(v){
  if( !v.x )
    debugger;
  return Vec2(this.x() + v.x(), this.y() + v.y())
};
Vec2.prototype.sub = function(v){
  if( !v )
    debugger;
  return Vec2(this.x() - v.x(), this.y() - v.y())
};
Vec2.prototype.updateTo = function( v )
{
  this.setX(v.x() );
  this.setY(v.y() );
}
Vec2.prototype.times = function(n){ return Vec2(this.x() * n, this.y() * n)};
Vec2.prototype.divide = function(n){ return Vec2(this.x() / n, this.y() / n)};
/**
 * Vector as a printable string.
 * @returns {string}
 */
Vec2.prototype.asText = function(){
  return " x:" + this.x().toFixed(2) + " y:" + this.y().toFixed(2)
};
/**
 * Euclidean length function for one vector.
 * @returns {number}
 */
Vec2.prototype.length = function(){
  return Math.sqrt(this.x() * this.x() + this.y() * this.y());
};
Vec2.prototype.normalPerp = function(length){
  length = length || 1;
  var ratio = length/this.length();
  return( Vec2(this.y() * -ratio, this.x() * ratio ) );
};
Vec2.prototype.normal = function(length){
  length = length || 1;
  var ratio = length/this.length();
  return( Vec2(this.x() * ratio, this.y() * ratio ) );
};
Vec2.prototype.angle = function(){
  return (180 / Math.PI ) * Math.atan2(this.x(), this.y() );
};
function dotProd( a,b ){
  return a.x() * b.x() + a.y() * b.y();
}
/**
 * Returns a vector with each component, x, y between the corresponding low and
 * high limits.
 * @param low
 * @param item
 * @param high
 */
function constrainVec2(low, item, high){
  var i;
  for( i = 0; i < 2; i++ ){
    item._vector[i] =
      Math.max(low._vector[i], Math.min(item._vector[i], high._vector[i]));
  }
}
/**
 * Integer version of the vector
 * @param v
 * @returns {Vec2}
 */
function floorVec2( v ){
  return Vec2( Math.floor(v.x()), Math.floor(v.y()) );
}
/**
 * Integer (nearest value) of the vector.
 * Has advantage of being anti-symmetric f(-a) = -f(a)
 * @param v
 * @returns {Vec2}
 */
function roundVec2( v ){
  return Vec2( Math.round(v.x()), Math.round(v.y()) );
}
/**
 * Componentwise max of two vectors.
 * @param a
 * @param b
 * @returns {Vec2}
 */
function maxVec2(a, b){
  var i;
  var item = new Vec2(a.x(), a.y());
  for( i = 0; i < 2; i++ ){
    item._vector[i] = Math.max(a._vector[i], b._vector[i]);
  }
  return item;
}
/**
 * Componentwise min of two vectors.
 * @param a
 * @param b
 * @returns {Vec2}
 */
function minVec2(a, b){
  var i;
  var item = new Vec2(a.x(), a.y());
  for( i = 0; i < 2; i++ ){
    item._vector[i] = Math.min(a._vector[i], b._vector[i]);
  }
  return item;
}
/**
 * Componentwise comparison of two vectors.
 * @param a
 * @param b
 * @returns {Vec2}
 */
function isAtLeastVec2(a, b){
  var i;
  for( i = 0; i < 2; i++ ){
    if( a._vector[i] > b._vector[i] )
      return false;
  }
  return true;
}
/**
 * Essentially an isInside function for a rectangle...
 * @param a
 * @param b
 * @param c
 * @returns {Vec2}
 */
function isInOrderVec2( a, b, c ){
  return isAtLeastVec2( a,b) && isAtLeastVec2( b, c );
}
/**
 * Helper function that blends two Vec2.
 * @param tBlend
 * @param a
 * @param b
 * @returns {*}
 */
function blendVec2(tBlend, a, b){
  return a.add((b.sub(a)).times( tBlend) );
}

//----------------------- Transforms ------------------------------------------
/**
 * Matrix multiplication.
 * Currently 2x2 matrix only.
 * @param M
 * @returns {Vec2}
 */
function matMul( M ){
  return Vec2( this.x() * M.c11 + this.y() * M.c12,
    this.x() * M.c21 + this.y() * M.c22 );
}
/**
 * Chain transforms.  Apply transforms in order.
 * @param S
 * @param T
 * @returns {Function}
 */
function compose( S, T ){
  if( !isDefined(T) )
    return S;
  if( !isDefined(S) )
    return T;
  return function( v ){
    return T(S(v));
  }
}
/**
 * The do nothing transform.
 * @param pos
 * @returns {Function}
 */
function identityTransform( v ){
    return v;
}
/**
 * Transform that makes a constant displacement to a point.
 * @param pos
 * @returns {Function}
 */
function displaceLambda( pos ){
  return function( v ){
    return v.add( pos );
  }
}
function scaleTransform( s ){
  return function( v ){
    return v.times( s );
  }
}
/**
 * Transform that flips x and y and then adds a constant.
 * Useful for converting a layout from horizontal mode to vertical mode.
 * @param pos
 * @returns {Function}
 */
function flipLambda( pos ){
  return function( v ){
    return Vec2(v.y(), v.x()).add( pos );
  }
}
/**
 * Special case of flip with no displacement.
 * @param v
 * @returns {Vec2}
 */
function basicFlip( v ){
  return Vec2(v.y(), v.x());
}
/**
 * Rotation by theta make function.
 * @param theta
 * @param pos
 * @param pos2
 * @returns {Function}
 */
function makeRotPosT( theta, pos, pos2 ){
  var c = Math.cos( theta );
  var s = Math.sin( theta );
  var M = {c11:c,c12:s,c21:-s,c22:c};
  var pos3 = pos.add( pos2 );

  return function(v){
    return matMul.call( v.sub(pos), M).add(pos3);
  }
}
/**
 * A spreading transform function, that is kind of
 * perspective like.  Bigger y means more spread.
 * Currently only used for the wedge-shaped arrows.
 * @param factor
 * @param pos
 * @param pos2
 * @returns {Function}
 */
function spreaderT( factor, pos, pos2 ){
  return function(v){
    var mul = (v.y()+factor) / (12*factor);
    return Vec2(v.x()*mul, v.y()).add( pos).add(pos2);
  }
}

/**
 * A transform function that wraps a strip from x=0 to x=2*radius into
 * a complete circle.
 * Note that it has too many parameters to be passed as a v-transformer,
 * so to actually use it we need to curry it.
 * @param pos - offset at which to plot top left corner.
 * @param radius - set this to half the box width to exactly fill a box
 * @param thetaIn - 0 starts plotting at East, with -PI/2 at North
 *    plotting is clockwise.
 * @returns {Function}
 */
function circularTransform(v, pos, radius, thetaIn){
  var r = radius - v.y();
  var theta = thetaIn + Math.PI * v.x() / radius;
  var u = Vec2(r * Math.cos(theta) + radius, r * Math.sin(theta) + radius);
  return u.add(pos);
}
/**
 * Makes a curried version of the circularise Transform i.e. with some values
 * already filled in
 * @param pos
 * @param radius
 * @param thetaIn
 */
function makeCirculariseLambda( pos, radius, thetaIn ){
  return function( v ){
    return circularTransform(v, pos, radius, thetaIn);
  }
}
/**
 * Lambdas can be a pain to debug and set breakpoints on, so here is a
 * concrete example of the circularise function, which we CAN put a
 * breakpoint on.  All the parameters are explicitly captured.
 * @param v
 */
function boxedCurving( v ){
  return circularTransform( v, Vec2(0,0), _params.RulerWidth/2, -Math.PI/2);
}
