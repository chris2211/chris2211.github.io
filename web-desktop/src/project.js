__require=function e(t,i,r){function s(c,o){if(!i[c]){if(!t[c]){var h=c.split("/");if(h=h[h.length-1],!t[h]){var a="function"==typeof __require&&__require;if(!o&&a)return a(h,!0);if(n)return n(h,!0);throw new Error("Cannot find module '"+c+"'")}}var l=i[c]={exports:{}};t[c][0].call(l.exports,function(e){return s(t[c][1][e]||e)},l,l.exports,e,t,i,r)}return i[c].exports}for(var n="function"==typeof __require&&__require,c=0;c<r.length;c++)s(r[c]);return s}({Board:[function(e,t,i){"use strict";cc._RF.push(t,"2bb35MbW8hDWa+k9hYR/5Tt","Board");var r=e("Config"),s=function(e){return e&&e.__esModule?e:{default:e}}(e("./util/Util"));cc.Class({extends:cc.Component,properties:{hexSide:4,tileH:110,tilePic:{default:null,type:cc.SpriteFrame},bomb:{default:null,type:cc.Prefab},type1:{default:null,type:cc.SpriteFrame},type2:{default:null,type:cc.SpriteFrame},type3:{default:null,type:cc.SpriteFrame},type4:{default:null,type:cc.SpriteFrame},type5:{default:null,type:cc.SpriteFrame},type6:{default:null,type:cc.SpriteFrame},type7:{default:null,type:cc.SpriteFrame},type8:{default:null,type:cc.SpriteFrame}},start:function(){this.Lock1Node=cc.find("Canvas/StarUnlock/Lock1"),this.Lock2Node=cc.find("Canvas/StarUnlock/Lock2"),this.rocket=cc.find("Canvas/rocket"),this.nice=cc.find("Canvas/nice"),this.fillTileScript=cc.find("Canvas/TileContainer/Tile").getComponent("Shape"),this.totalPopArrs=[],this.resultArr=[],this.theScore=0},onLoad:function(){this.setHexagonGrid(),this.node.on("dropSuccess",this.deleteTile,this),this.getOldScore(),this.StarLockCount=2},onSeekHelpBtnClicked:function(){cc.loader.loadRes("pics/logo",function(e,t){wx.shareAppMessage({title:"\u7ecf\u5178\u5c0f\u6e38\u620f\u59cb\u7ec8\u597d\u73a9\u5982\u521d\uff0c\u6765\u5427\uff01\u4e00\u8d77\u6765\u56de\u5473\u5427\uff01",imageUrl:t.url,success:function(e){null==e.shareTickets||void 0==e.shareTickets||""==e.shareTickets?cc.log("res.shareTickets is null"):(cc.log("res.shareTickets is not null"),e.shareTickets.length)},fail:function(e){console.log("\u8f6c\u53d1\u5931\u8d25!!!")}})})},getOldScore:function(){var e=cc.sys.localStorage.getItem("score");cc.find("Canvas/Score").getComponent(cc.Label).string=Number(e)},sortCurrTileByAroundNum:function(){this.boardFrameList;this.getAroundNum(this.loc[0])<this.getAroundNum(this.loc[this.loc.length-1])&&(this.loc=this.loc.reverse())},getAroundNum:function(e){var t=this.boardFrameList,i=Number(e),r=[],n=0;if(t[i]&&t[i].isFulled){r=s.default.getNeighbors(e);for(var c=0;c<r.length;c++)t[r[c]].isFulled&&i!=Number(r[c])&&t[r[c]].getChildByName("fillNode").tag==t[i].getChildByName("fillNode").tag&&n++}return n},checkOneBlockCanPop:function(e){var t=this.boardFrameList;this.idxArr=[],this.neiArr=[],this.sneiArr=[],this.tneiArr=[],this.uneiArr=[],this.zneiArr=[],this.fneiArr=[];var i=Number(e);if(t[i]&&t[i].isFulled){this.tmpArr=s.default.getNeighbors(e);for(var r=0;r<this.tmpArr.length;r++){if(t[this.tmpArr[r]].isFulled&&i!=Number(this.tmpArr[r])&&t[this.tmpArr[r]].getChildByName("fillNode").tag==t[i].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.tmpArr[r]])){this.resultArr.push(t[this.tmpArr[r]]),this.neiArr=s.default.getNeighbors(String(this.tmpArr[r]));for(var n=0;n<this.neiArr.length;n++)if(t[this.neiArr[n]].isFulled&&Number(this.tmpArr[r])!=Number(this.neiArr[n])&&t[this.tmpArr[r]].getChildByName("fillNode").tag==t[this.neiArr[n]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.neiArr[n]])){this.resultArr.push(t[this.neiArr[n]]),this.sneiArr=s.default.getNeighbors(String(this.neiArr[n]));for(var c=0;c<this.sneiArr.length;c++)if(t[this.sneiArr[c]].isFulled&&Number(this.neiArr[n])!=Number(this.sneiArr[c])&&t[this.neiArr[n]].getChildByName("fillNode").tag==t[this.sneiArr[c]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.sneiArr[c]])){this.resultArr.push(t[this.sneiArr[c]]),this.tneiArr=s.default.getNeighbors(String(this.sneiArr[c]));for(var o=0;o<this.tneiArr.length;o++)if(t[this.tneiArr[o]].isFulled&&Number(this.tneiArr[o])!=Number(this.sneiArr[c])&&t[this.tneiArr[o]].getChildByName("fillNode").tag==t[this.sneiArr[c]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.tneiArr[o]])){this.resultArr.push(t[this.tneiArr[o]]),this.uneiArr=s.default.getNeighbors(String(this.tneiArr[o]));for(var h=0;h<this.uneiArr.length;h++)if(t[this.uneiArr[h]].isFulled&&Number(this.tneiArr[o])!=Number(this.uneiArr[h])&&t[this.tneiArr[o]].getChildByName("fillNode").tag==t[this.uneiArr[h]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.uneiArr[h]])){this.resultArr.push(t[this.uneiArr[h]]),this.zneiArr=s.default.getNeighbors(String(this.tneiArr[o]));for(var a=0;a<this.zneiArr.length;a++)if(t[this.zneiArr[a]].isFulled&&Number(this.zneiArr[a])!=Number(this.uneiArr[h])&&t[this.zneiArr[a]].getChildByName("fillNode").tag==t[this.uneiArr[h]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.zneiArr[a]])){this.resultArr.push(t[this.zneiArr[a]]),this.fneiArr=s.default.getNeighbors(String(this.zneiArr[a]));for(var l=0;l<this.fneiArr.length;l++)t[this.fneiArr[l]].isFulled&&Number(this.zneiArr[a])!=Number(this.fneiArr[l])&&t[this.fneiArr[l]].getChildByName("fillNode").tag==t[this.zneiArr[a]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(t[this.fneiArr[l]])&&this.resultArr.push(t[this.fneiArr[l]])}}}}}}if(this.resultArr.length>2)this.totalPopArrs.push(this.resultArr),this.resultArr=[];else for(var u=0;u<this.resultArr.length;u++)this.resultArr[u].isFulled=!0}}},changeRange:function(){this.fillTileScript.rangeAdd()},checkCanPut:function(){this.fillTileScript.checkEnd()&&this.gameOver()},dumpBoard:function(){for(var e=this.boardFrameList,t=0;t<e.length;t++){var i=e[t];if(i.isFulled){var r=i.getChildByName("fillNode");i.getChildByName("moveNode");cc.log("board idx: "+i.tag),cc.log("board fillNode: "+r.isFulled)}}},deleteTile:function(e){var t=this;this.totalPopArrs=[],this.resultArr=[],this.tmpArr=[],this.loc=[];var i=void 0,r=void 0,n=0;this.block=e.detail.msg.trim().split(",");for(var c=0;c<this.block.length-1;c++)this.loc.push(this.block[c]);this.sortCurrTileByAroundNum();for(var o=Number(this.loc[0]),h=0;h<this.loc.length;h++){if(this.checkOneBlockCanPop(this.loc[h]),this.totalPopArrs.length>0)for(var a=function(e){for(var c=t.totalPopArrs[e],h=function(e){var s=c[e].getChildByName("fillNode"),h=c[e].getChildByName("moveNode");if(c[e].tag==o)return n=e,"continue";i=c[n].getChildByName("fillNode").tag,r=c[n].tag;var a=cc.callFunc(function(){s.getComponent(cc.Sprite).spriteFrame=null},t);s.runAction(cc.sequence(cc.fadeOut(.6),a)),u=h.x,p=h.y,c[e].isFulled=!1;var l=cc.callFunc(function(){h.getComponent(cc.Sprite).spriteFrame=null,h.setPosition(u,p)},t);h.runAction(cc.sequence(cc.moveTo(1/e,13,-1e4),l)),t.addScore((e+1)*e)},a=0;a<c.length;a++)h(a);if(t.changeRange(),t.totalPopArrs.length>2&&t.niceMoveAction(),i>0&&i<7){if(i++,c[n].getChildByName("fillNode").tag=i,c[n].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame=t["type"+i],c[n].getChildByName("moveNode").getComponent(cc.Sprite).spriteFrame=t["type"+i],8==i){var l=c[n].getChildByName("fillNode"),m=cc.callFunc(function(){l.isFulled=!1},t);l.runAction(cc.sequence(cc.fadeOut(.5),m))}}else if(7==i){if(2==t.StarLockCount)t.Lock1Node.getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw("resources/pics/daojugaoliang.png")),t.StarLockCount--;else if(1==t.StarLockCount)t.Lock2Node.getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw("resources/pics/daojugaoliang.png")),t.StarLockCount--;else for(var g=s.default.getNeighbors(String(r)),v=function(e){var i=t.boardFrameList[Number(g[e])],r=cc.callFunc(function(){var e=cc.instantiate(t.bomb);e.parent=t.node.parent,e.setPosition(i.x,i.y),cc.fadeOut(.3),i.getComponent(cc.Sprite).spriteFrame=t.tilePic,i.opacity=255,i.isFulled=!1,c[n].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame=t.tilePic,c[n].getChildByName("moveNode").getComponent(cc.Sprite).spriteFrame=t.tilePic,c[n].isFulled=!1},t);i.runAction(cc.sequence(cc.delayTime(.2),r))},C=0;C<g.length;C++)v(C);i++,c[n].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame=t["type"+i],c[n].getChildByName("moveNode").getComponent(cc.Sprite).spriteFrame=t["type"+i];var N=c[n].getChildByName("fillNode"),b=c[n].getChildByName("moveNode");d=b.x,f=b.y;var A=cc.callFunc(function(){N.isFulled=!1,c[n].isFulled=!1},t),y=cc.callFunc(function(){b.getComponent(cc.Sprite).spriteFrame=null,b.setPosition(d,f)},t);N.runAction(cc.sequence(cc.fadeOut(.5),A)),b.runAction(cc.sequence(cc.moveTo(.2,13,-1e4),y))}for(var F=c[0].tag+",",S=s.default.getNeighbors(String(r)),k=0;k<S.length;k++)t.boardFrameList[S[k]].isFulled&&(F+=S[k],F+=",");t.node.emit("dropSuccess",{msg:F})},l=0;l<this.totalPopArrs.length;l++){var u,p,d,f;a(l)}else this.checkCanPut();this.resultArr=[],this.totalPopArrs=[]}},addScore:function(e){var t=this.scoreRule(e),i=cc.find("Canvas/Score").getComponent(cc.Label);i.string=t+Number(i.string),this.theScore=Number(i.string)},scoreRule:function(e){var t=e+1;return t},gameOver:function(){var e=cc.find("Canvas/GameOver");this.gameOverScore=cc.find("Canvas/GameOver/Score"),this.gameOverScore.getComponent(cc.Label).string=String(this.theScore),e.active=!0,e.runAction(cc.fadeIn(.3))},setHexagonGrid:function(){var e=this;this.hexes=[],this.boardFrameList=[],this.resultArr=[],this.hexSide--;for(var t=-this.hexSide;t<=this.hexSide;t++)for(var i=Math.max(-this.hexSide,-t-this.hexSide),r=Math.min(this.hexSide,-t+this.hexSide),s=i;s<=r;s++){var n=t+this.hexSide,c=s-i;this.hexes[n]||(this.hexes[n]=[]),this.hexes[n][c]=this.hex2pixel({q:t,r:s},this.tileH)}this.hexes.forEach(function(t){e.setSpriteFrame(t)}),this.setLogicIdx()},hex2pixel:function(e,t){var i=t/2,r=i*Math.sqrt(3)*(e.q+e.r/2),s=3*i/2*e.r;return cc.p(r,s)},setSpriteFrame:function(e){for(var t=0;t<e.length;t++){var i=new cc.Node("frame");i.addComponent(cc.Sprite).spriteFrame=this.tilePic,i.x=e[t].x,i.y=e[t].y,i.parent=this.node,e[t].spriteFrame=i,this.setShadowNode(i),this.setFillNode(i),this.setMoveNode(i),this.boardFrameList.push(i)}},resetBoard:function(){for(var e=this.boardFrameList,t=0;t<e.length;t++){e[t].isFulled||(e[t].getComponent(cc.Sprite).spriteFrame=this.tilePic)}},setLogicIdx:function(){for(var e=this.boardFrameList,t=0;t<e.length;t++)e[t].tag=t},setShadowNode:function(e){var t=new cc.Node("frame");t.addComponent(cc.Sprite),t.name="shadowNode",t.opacity=150,t.parent=e},setFillNode:function(e){var t=new cc.Node("frame");t.addComponent(cc.Sprite),t.name="fillNode",t.parent=e},setMoveNode:function(e){var t=new cc.Node("frame");t.addComponent(cc.Sprite),t.name="moveNode",t.parent=e},onRestartClick:function(){cc.director.loadScene("gameScene")},spriteMoveAction:function(){var e=cc.moveTo(3,cc.v2(520,68)).easing(cc.easeCircleActionInOut()),t=cc.callFunc(function(){cc.delayTime(.5),this.rocket.setPosition(-540,276)},this);this.rocket.runAction(cc.sequence(e,t))},niceMoveAction:function(){var e=cc.moveTo(2,cc.v2(26,351)).easing(cc.easeCubicActionInOut()),t=cc.callFunc(function(){cc.fadeOut(1),this.nice.setPosition(612,351)},this);this.nice.runAction(cc.sequence(e,t))},onRocketBtnClick:function(){var e=this,t=s.default.getRandomInt(0,7);this.spriteMoveAction();for(var i=function(i){cc.log(r.RocketLine[t][i]);var s=e.boardFrameList[Number(r.RocketLine[t][i])].getChildByName("fillNode"),n=e.boardFrameList[Number(r.RocketLine[t][i])].getChildByName("moveNode");e.boardFrameList[Number(r.RocketLine[t][i])].isFulled=!1;var c=cc.callFunc(function(){var t=cc.instantiate(e.bomb);t.parent=e.node.parent,t.setPosition(s.x,s.y),s.getComponent(cc.Sprite).spriteFrame=e.tilePic,s.opacity=255},e);s.runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(.3),c)),n.runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(.3)))},n=0;n<r.RocketLine[t].length;n++)i(n)},eff:function(){for(var e=this.boardFrameList,t=0;t<e.length;t++)e[t].isFulled&&(e[t].getChildByName("fillNode").runAction(cc.sequence(cc.delayTime(.1),cc.scaleTo(1,.9))),e[t].getChildByName("moveNode").runAction(cc.sequence(cc.delayTime(.1),cc.scaleTo(1,.9))))},update:function(e){this.eff()}}),cc._RF.pop()},{"./util/Util":"Util",Config:"Config"}],Circle:[function(e,t,i){"use strict";cc._RF.push(t,"56b66UhwpFPsqofgW89t+EY","Circle"),cc.Class({extends:cc.Component,properties:{speed:1},start:function(){},updateCircle:function(){this.node.rotation+=this.speed,this.node.rotation>=360&&(this.node.rotation-=360)},update:function(e){this.updateCircle()}}),cc._RF.pop()},{}],Config:[function(e,t,i){"use strict";cc._RF.push(t,"c83ferrDsdJx4L++guKEIwB","Config"),Object.defineProperty(i,"__esModule",{value:!0});i.default={Tiles:[{type:1,list:[[[0,0]]]},{type:2,list:[[[0,0],[1,0]]]},{type:3,list:[[[1,-1],[1,0]]]},{type:4,list:[[[1,-1],[0,0]]]},{type:5,list:[[[1,-1],[1,0]]]},{type:6,list:[[[1,-1],[0,0]]]},{type:7,list:[[[1,-1],[1,0]]]},{type:8,list:[[[1,-1],[0,0]]]}],RocketLine:[[3,8,14,21],[2,7,13,20,27],[1,6,12,19,26,32],[0,5,11,18,25,31,36],[4,10,17,24,30,35],[9,16,23,29,34],[15,22,28,33]]},t.exports=i.default,cc._RF.pop()},{}],EnableCollider:[function(e,t,i){"use strict";cc._RF.push(t,"64cccjTxd9NnaJHWcg1tJHH","EnableCollider"),cc.Class({extends:cc.Component,properties:{is_enbale:!0,is_debug:!0},start:function(){if(1==this.is_enbale){var e=cc.director.getCollisionManager();e.enabled=!0,e.enabledDebugDraw=!1}}}),cc._RF.pop()},{}],Hammer:[function(e,t,i){"use strict";cc._RF.push(t,"b4512nSFexIBr5Kiqu2K+g/","Hammer");var r=function(e){return e&&e.__esModule?e:{default:e}}(e("Board"));cc.Class({extends:cc.Component,properties:{Count:3,board:{default:null,type:r.default}},onLoad:function(){this.addTouchEvent(),this.HammerCntLabel=cc.find("Canvas/HCount").getComponent(cc.Label)},start:function(){this.node.ox=this.node.x,this.node.oy=this.node.y,this.markedTile=null,this.HammerCntLabel.string=String(this.Count)},addTouchEvent:function(){var e=this;this.node.on("touchstart",function(t){e.node.setScale(1.2),e.boardTiles=[]}),this.node.on("touchmove",function(t){var i=t.touch.getDelta(),r=i.x,s=i.y;e.node.x+=1.1*r,e.node.y+=1.1*s,e.checkCollision(),e.dropPrompt(!0)}),this.node.on("touchend",function(){e.removeTile1()}),this.node.on("touchcancel",function(){e.removeTile1()})},iterateRestore:function(){for(var e=this.board.boardFrameList,t=0;t<e.length;t++){var i=e[t].getChildByName("fillNode"),r=e[t].getChildByName("moveNode");i.opacity=255,r.opacity=255}},removeTile1:function(){null!=this.markedTile&&(this.Count>=1?(this.markedTile.isFulled=!1,this.markedTile.getChildByName("fillNode").tag=-1,this.markedTile.getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame=null,this.markedTile.getChildByName("moveNode").getComponent(cc.Sprite).spriteFrame=null,this.Count--,this.HammerCntLabel.string=String(this.Count),this.markedTile=null):(this.markedTile.getChildByName("fillNode").opacity=255,this.markedTile.getChildByName("moveNode").opacity=255)),this.iterateRestore(),this.backSourcePos()},removeTile:function(){if(this.Count>=1){var e=this.boardTiles;cc.log("length: "+e.length),this.boardTiles.length>0&&this&&(e[0].isFulled=!1,e[0].getChildByName("fillNode").tag=-1,e[0].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame=null,e[0].getChildByName("moveNode").getComponent(cc.Sprite).spriteFrame=null,this.backSourcePos(),this.Count--,this.HammerCntLabel.string=String(this.Count),this.iterateRestore()),this.backSourcePos()}else this.backSourcePos()},backSourcePos:function(){this.node.x=this.node.ox,this.node.y=this.node.oy},checkCollision:function(){this.node;this.boardTiles=[];var e=this.node.position,t=this.checkDistance(e);t&&this.boardTiles.push(t)},checkDistance:function(e){for(var t=this.board.boardFrameList,i=0;i<t.length;i++){var r=t[i];if(r.isFulled)if(cc.pDistance(r.position,e)<=20)return r}},resetBoardFrames:function(){for(var e=this.board.boardFrameList,t=0;t<e.length;t++){e[t].getChildByName("shadowNode").opacity=0}},dropPrompt:function(){if(!(this.Count<=0)){var e=this.boardTiles,t=e.length;this.resetBoardFrames();for(var i=0;i<t;i++){var r=e[i].getChildByName("fillNode"),s=e[i].getChildByName("moveNode");return r.opacity=100,s.opacity=100,void(this.markedTile=e[i])}}}}),cc._RF.pop()},{Board:"Board"}],Shape:[function(e,t,i){"use strict";cc._RF.push(t,"0e7f22C7WdHQLHhDwpJq4dg","Shape");var r=c(e("Board")),s=e("Config"),n=c(e("./util/Util"));function c(e){return e&&e.__esModule?e:{default:e}}var o=function(e,t){var i=cc.random0To1();return e+Math.floor((t-e)*i)};cc.Class({extends:cc.Component,properties:{tileH:122,tileScale:.7,distance:28,turn:1,board:{default:null,type:r.default},type1:{default:null,type:cc.SpriteFrame},type2:{default:null,type:cc.SpriteFrame},type3:{default:null,type:cc.SpriteFrame},type4:{default:null,type:cc.SpriteFrame},type5:{default:null,type:cc.SpriteFrame},type6:{default:null,type:cc.SpriteFrame},type7:{default:null,type:cc.SpriteFrame},type8:{default:null,type:cc.SpriteFrame}},onLoad:function(){this.range=2,this.setTile(),this.addTouchEvent()},start:function(){this.TurnCntLabel=cc.find("Canvas/TCount").getComponent(cc.Label),this.TurnCntLabel.string=String(this.turn),this.circle=cc.find("Canvas/TileContainer/Circle")},rangeAdd:function(){this.range<7&&(this.range+=1)},setTile1:function(){var e=this;this.tiles=s.Tiles;var t=this.random1().list.map(function(t){return e.hex2pixel(t,e.tileH)});this.setSpriteFrame(t),this.node.scale=this.tileScale,this.node.ox=this.node.x,this.node.oy=this.node.y},setTile:function(){var e=this;this.tiles=s.Tiles;var t=this.random().list.map(function(t){return e.hex2pixel(t,e.tileH)});this.setSpriteFrame(t),this.node.scale=this.tileScale,this.node.ox=this.node.x,this.node.oy=this.node.y},random1:function(){var e=this.tiles[0],t=e.list[0];return{type:e.type,list:t}},random:function(){var e=this.tiles[o(0,this.tiles.length)],t=e.list[o(0,e.list.length)];return{type:e.type,list:t}},hex2pixel:function(e,t){var i=t/2,r=i*Math.sqrt(3)*(e[0]+e[1]/2),s=3*i/2*e[1];return cc.p(r,s)},setSpriteFrame:function(e){for(var t=0;t<e.length;t++){var i=new cc.Node("frame"),r=i.addComponent(cc.Sprite),s=(this.random(),o(1,this.range));r.spriteFrame=this["type"+s],i.x=e[t].x,i.y=e[t].y,i.parent=this.node,i.tag=s,i.isBuilding=!1}},onTurnBtn:function(){this.turn>=1&&(this.turn--,this.resetTile(),this.TurnCntLabel.string=String(this.turn))},onReverseBtn:function(){if(2==this.node.children.length){var e=this.node.children[0].x,t=this.node.children[0].y;this.node.children[0].setPosition(this.node.children[1].x,this.node.children[1].y),this.node.children[1].setPosition(e,t)}},addTouchEvent:function(){var e=this;this.node.on("touchstart",function(t){e.node.setScale(1),e.node.children.forEach(function(e){e.setScale(1.1)}),e.boardTiles=[],e.fillTiles=[]}),this.node.on("touchmove",function(t){var i=t.touch.getDelta(),r=i.x,s=i.y;e.node.x+=r,e.node.y+=s,e.checkCollision(),e.checkCanDrop()?e.dropPrompt(!0):e.dropPrompt(!1)}),this.node.on("touchend",function(){e.tileDrop()}),this.node.on("touchcancel",function(){e.tileDrop()})},tileDrop:function(){if(this.resetBoardFrames(),this.checkCanDrop()){var e=this.boardTiles,t=this.fillTiles,i=t.length;this.locations=[];for(var r=0;r<i;r++){var s=e[r],n=t[r],c=s.getChildByName("fillNode"),o=s.getChildByName("moveNode"),h=n.getComponent(cc.Sprite).spriteFrame;s.isFulled=!0,c.getComponent(cc.Sprite).spriteFrame=h,o.getComponent(cc.Sprite).spriteFrame=h,c.tag=n.tag,this.locations.push(s.tag),this.checkCurBoard()?this.resetTile1():this.resetTile()}this.board.curTileLength=t.length;for(var a="",l=this.locations.length-1;l>=0;l--)a+=this.locations[l],a+=",";this.board.node.emit("dropSuccess",{msg:a})}else this.backSourcePos()},checkCurBoard:function(){for(var e=this.board.boardFrameList,t=e.length,i=0,r=0;r<t;r++){e[r].isFulled||i++}return i<14},checkLose1:function(){for(var e=this.board.boardFrameList,t=e.length,i=0,r=0;r<t;r++){e[r].isFulled&&i++}return 37==i},checkEnd:function(){return!!this.checkCurBoard()&&(this.checkCollision(),this.checkDrop()?!!this.checkLose1():void 0)},checkLose:function(){var e=this.node.children,t=e.length,i=this.board.boardFrameList,r=i.length;this.tmpArr=[],this.resultArr=[],this.neiArr=[],this.sneiArr=[];for(var s=0;s<r;s++){var c=i[s];if(!c.isFulled){for(var o=0;o<t;o++){this.tmpArr=n.default.getNeighbors(String(c.tag));for(var h=0;h<this.tmpArr.length;h++)if(i[this.tmpArr[h]].isFulled&&Number(c.tag)!=Number(this.tmpArr[h])&&e[o].tag==i[this.tmpArr[h]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(i[this.tmpArr[h]])){this.resultArr.push(i[this.tmpArr[h]]),this.neiArr=n.default.getNeighbors(String(this.tmpArr[h]));for(var a=0;a<this.neiArr.length;a++)if(i[this.neiArr[a]].isFulled&&Number(this.neiArr[a])!=Number(this.tmpArr[h])&&i[this.neiArr[a]].getChildByName("fillNode").tag==i[this.tmpArr[h]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(i[this.neiArr[a]])){this.resultArr.push(i[this.neiArr[a]]),this.sneiArr=n.default.getNeighbors(String(this.tmpArr[h]));for(var l=0;l<this.sneiArr.length;l++)i[this.sneiArr[l]].isFulled&&Number(this.sneiArr[l])!=Number(this.neiArr[a])&&i[this.sneiArr[l]].getChildByName("fillNode").tag==i[this.neiArr[a]].getChildByName("fillNode").tag&&-1==this.resultArr.indexOf(i[this.sneiArr[l]])&&this.resultArr.push(i[this.neiArr[l]])}}}if(this.resultArr.length>=2)return this.resultArr=[],!1}}return!0},checkDrop:function(){for(var e=0,t=this.node.children,i=t.length,r=this.board.boardFrameList,s=r.length,n=0;n<s;n++){var c=r[n],o=cc.p(c.x,c.y),h=0;if(!c.isFulled){for(var a=0;a<i;a++)for(var l=cc.pAdd(o,cc.p(t[a].x,t[a].y)),u=0;u<s;u++){var p=r[u];cc.pDistance(cc.p(p.x,p.y),l)<=10&&!p.isFulled&&h++}h===i&&e++}}return 0===e},resetTile:function(){this.node.removeAllChildren(),this.node.x=this.node.ox,this.node.y=this.node.oy,this.setTile()},resetTile1:function(){this.node.removeAllChildren(),this.node.x=this.node.ox,this.node.y=this.node.oy,this.setTile1()},backSourcePos:function(){this.node.scale=this.tileScale,this.node.x=this.node.ox,this.node.y=this.node.oy,this.node.children.forEach(function(e){e.setScale(1)})},checkCollision:function(){var e=this.node.children;this.boardTiles=[],this.fillTiles=[];for(var t=cc.p(this.node.position.x,this.node.position.y-480),i=0;i<e.length;i++){var r=e[i],s=cc.pAdd(t,r.position),n=this.checkDistance(s);n&&(this.fillTiles.push(r),this.boardTiles.push(n))}},checkDistance:function(e){for(var t=this.board.boardFrameList,i=0;i<t.length;i++){var r=t[i],s=cc.pDistance(r.position,e);if(this.distance>=s)return r}},checkCanDrop:function(){var e=this.boardTiles,t=this.node.children,i=e.length,r=t.length;if(0===i||i!=r)return!1;for(var s=0;s<i;s++)if(this.boardTiles[s].isFulled)return!1;return!0},resetBoardFrames:function(){for(var e=this.board.boardFrameList,t=0;t<e.length;t++){e[t].getChildByName("shadowNode").opacity=0}},dropPrompt:function(e){var t=this.boardTiles,i=t.length,r=this.fillTiles;if(this.roundArr=[],this.resetBoardFrames(),e){if(1==i){var s=t[0].getChildByName("shadowNode");s.opacity=100;var c=r[0].getComponent(cc.Sprite).spriteFrame;s.getComponent(cc.Sprite).spriteFrame=c}if(i>1){this.roundArr=n.default.getNeighbors(String(t[0].tag));for(var o=0;o<this.roundArr.length;o++)if(this.roundArr[o]==t[1].tag)for(var h=0;h<i;h++){var a=t[h].getChildByName("shadowNode");a.opacity=100;var l=r[h].getComponent(cc.Sprite).spriteFrame;a.getComponent(cc.Sprite).spriteFrame=l}}}}}),cc._RF.pop()},{"./util/Util":"Util",Board:"Board",Config:"Config"}],Util:[function(e,t,r){"use strict";cc._RF.push(t,"0f151PisGVJAKNTI3GsmFYp","Util"),Object.defineProperty(r,"__esModule",{value:!0});var s={arrIntersect:function(e,t){for(var i=[],r=0;r<e.length;r++)for(var s=0;s<t.length;s++)t[s]==e[r]&&i.push(t[s]);return i},arrUnion:function(e,t,r,s){for(var n=[],c=0;c<e.length;c++)e[c]!=r&&n.push(e[c]);for(leti=0;i<t.length;i++)t[i]!=s&&n.push(t[i]);return n},checkArrIsEqual:function(e,t){for(var i=0;i<e.length;i++)if(t[i]!=e[i])return!1;return!0},getNeighbors:function(e){var t=[];switch(e){case"3":t.push(8),t.push(7),t.push(2);break;case"8":t.push(14),t.push(13),t.push(7),t.push(3);break;case"14":t.push(21),t.push(20),t.push(13),t.push(8);break;case"21":t.push(27),t.push(20),t.push(14);break;case"2":t.push(3),t.push(7),t.push(6),t.push(1);break;case"7":t.push(8),t.push(13),t.push(12),t.push(6),t.push(2),t.push(3);break;case"13":t.push(14),t.push(20),t.push(19),t.push(12),t.push(7),t.push(8);break;case"20":t.push(27),t.push(26),t.push(19),t.push(21),t.push(13),t.push(14);break;case"27":t.push(32),t.push(26),t.push(20),t.push(14),t.push(21);break;case"1":t.push(2),t.push(6),t.push(5),t.push(0);break;case"6":t.push(7),t.push(12),t.push(11),t.push(5),t.push(1),t.push(2);break;case"12":t.push(13),t.push(19),t.push(18),t.push(11),t.push(6),t.push(7);break;case"19":t.push(20),t.push(26),t.push(25),t.push(18),t.push(12),t.push(13);break;case"26":t.push(27),t.push(32),t.push(31),t.push(25),t.push(19),t.push(20);break;case"32":t.push(36),t.push(31),t.push(26),t.push(27);break;case"0":t.push(1),t.push(5),t.push(4);break;case"5":t.push(6),t.push(11),t.push(10),t.push(4),t.push(0),t.push(1);break;case"11":t.push(12),t.push(18),t.push(17),t.push(10),t.push(5),t.push(6);break;case"18":t.push(19),t.push(25),t.push(24),t.push(17),t.push(11),t.push(12);break;case"25":t.push(26),t.push(31),t.push(30),t.push(24),t.push(18),t.push(19);break;case"31":t.push(32),t.push(36),t.push(35),t.push(30),t.push(25),t.push(26);break;case"36":t.push(35),t.push(31),t.push(32);break;case"4":t.push(5),t.push(10),t.push(9),t.push(0);break;case"10":t.push(11),t.push(17),t.push(16),t.push(9),t.push(4),t.push(5);break;case"17":t.push(18),t.push(24),t.push(23),t.push(16),t.push(10),t.push(11);break;case"24":t.push(25),t.push(30),t.push(29),t.push(23),t.push(17),t.push(18);break;case"30":t.push(31),t.push(35),t.push(34),t.push(29),t.push(24),t.push(25);break;case"35":t.push(36),t.push(34),t.push(30),t.push(31);break;case"9":t.push(10),t.push(16),t.push(15),t.push(4);break;case"16":t.push(17),t.push(23),t.push(22),t.push(15),t.push(9),t.push(10);break;case"23":t.push(24),t.push(29),t.push(28),t.push(22),t.push(16),t.push(17);break;case"29":t.push(30),t.push(34),t.push(33),t.push(28),t.push(23),t.push(24);break;case"34":t.push(35),t.push(33),t.push(29),t.push(30);break;case"15":t.push(16),t.push(22),t.push(9);break;case"22":t.push(23),t.push(28),t.push(15),t.push(16);break;case"28":t.push(29),t.push(33),t.push(22),t.push(23);break;case"33":t.push(34),t.push(28),t.push(29)}return t},getRandomInt:function(e,t){var i=cc.random0To1();return e+Math.floor((t-e)*i)}};r.default=s,t.exports=r.default,cc._RF.pop()},{}],game:[function(e,t,i){"use strict";var r;function s(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","game");cc.Class({extends:cc.Component,properties:(r={},s(r,"gridLineCount",4),s(r,"gridH",0),s(r,"gridA",0),s(r,"frameSprite",{default:null,type:cc.SpriteFrame}),r),checkMatch:function(e){cc.error("testtesttest")},onLoad:function(){for(var e=cc.p(this.node.x,this.node.y),t=(this.gridLineCount,[{count:4,srcPos:cc.p(0,0)},{count:5,srcPos:cc.p(2*this.gridH,0)},{count:6,srcPos:cc.p(4*this.gridH,0)},{count:7,srcPos:cc.p(6*this.gridH,0)},{count:6,srcPos:cc.p(6*this.gridH+this.gridH,-3*this.gridA/2)},{count:5,srcPos:cc.p(6*this.gridH+2*this.gridH,-3*this.gridA*2/2)},{count:4,srcPos:cc.p(6*this.gridH+3*this.gridH,-3*this.gridA*3/2)}]),i=cc.pMult(cc.pForAngle(2*Math.PI/360*240),2*this.gridH),r=cc.pMult(cc.pForAngle(2*Math.PI/360*120),2*this.gridH*4),s=[],n=[],c=0;c<t.length;c++)for(var o=t[c].count,h=cc.pAdd(t[c].srcPos,r),a=cc.pAdd(e,h),l=0;l<o;l++){var u=cc.pAdd(a,cc.pMult(i,l));n.push(u)}for(var p=0;p<n.length;p++){var d=new cc.Node("frame");d.addComponent(cc.Sprite).spriteFrame=this.frameSprite,d.x=n[p].x,d.y=n[p].y,d.parent=this.node,d.FKIndex=p,s.push(d)}this.frameList=s,this.posList=t,this.node.on("successDropDown",this.checkMatch,this)},update:function(e){}}),cc._RF.pop()},{}],piece:[function(e,t,i){"use strict";var r;function s(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}cc._RF.push(t,"781932YGwFIb4cVVETldBUo","piece");var n=e("game");cc.Class({extends:cc.Component,properties:(r={board:{default:null,type:n}},s(r,"blockTex",{default:null,type:cc.SpriteFrame}),s(r,"gridH",0),s(r,"gridA",0),s(r,"block2",{default:null,type:cc.SpriteFrame}),r),random:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},getPieceConfig:function(){var e=this.gridA,t=this.gridH;return[[cc.p(0,0)],[cc.p(0,0),cc.p(2*t,0)],[cc.p(0,0),cc.p(t,1.5*e)],[cc.p(0,0),cc.p(t,1.5*-e)],[cc.p(0,0),cc.p(2*t,0),cc.p(4*t,0)],[cc.p(0,0),cc.p(2*t,0),cc.p(3*t,1.5*e)],[cc.p(0,0),cc.p(2*t,0),cc.p(3*t,1.5*-e)],[cc.p(0,0),cc.p(2*t,0),cc.p(t,1.5*e)],[cc.p(0,0),cc.p(2*t,0),cc.p(t,1.5*-e)],[cc.p(0,0),cc.p(t,1.5*e),cc.p(3*t,1.5*e)],[cc.p(0,0),cc.p(t,1.5*e),cc.p(2*t,3*e)],[cc.p(0,0),cc.p(t,1.5*e),cc.p(0,3*e)],[cc.p(0,0),cc.p(t,1.5*-e),cc.p(3*t,1.5*-e)],[cc.p(0,0),cc.p(t,1.5*-e),cc.p(2*t,3*-e)],[cc.p(0,0),cc.p(t,1.5*-e),cc.p(0,3*-e)]]},newBlock:function(){var e=new cc.Node("colorSpr");e.addComponent(cc.Sprite).spriteFrame=this.block2;var t=new cc.Node("wenliSpr");return t.addComponent(cc.Sprite).spriteFrame=this.blockTex,t.parent=e,e},newPiece:function(){var e=new cc.Node("block"),t=this.getPieceConfig(),i=this.random(0,t.length-1),r=t[i];i=this.random(1,4);for(var s=0,n=0,c=0,o=0,h=0;h<r.length;h++){var a=r[h],l=this.newBlock();l.x=a.x,s+=l.x,n++,l.y=a.y,c+=l.y,o++,e.addChild(l)}return e.x=-s/n,e.y=-c/o,e.setScale(.7),e},addTouchEvent:function(){var e=this;this.node.ox=this.node.x,this.node.oy=this.node.y,this.node.on(cc.Node.EventType.TOUCH_START,function(){this.y+=100,this.getChildByName("block").setScale(1)},this.node),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(t){var i=t.touch.getDelta();this.x+=i.x,this.y+=i.y,e.collisionFunc(),e.checkIsCanDrop()?e.changeColorDeal():e.changeColorDeal(!0)},this.node),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){this.dropDownFunc()},this),this.node.on(cc.Node.EventType.TOUCH_END,function(e){this.dropDownFunc()},this)},onLoad:function(){this.checkFrameList=[],this.checkFKList=[];var e=this.newPiece();this.node.addChild(e),this.addTouchEvent()}}),cc._RF.pop()},{game:"game"}],start:[function(e,t,i){"use strict";cc._RF.push(t,"ee083cZm11PnZ++HY0CLNsG","start"),cc.Class({extends:cc.Component,properties:{rankingScrollView:cc.Sprite},start:function(){this.isClick=!1},onfriendClick:function(){cc.log("\u83b7\u53d6\u597d\u53cb\u6392\u884c\u699c\u6570\u636e\u3002x1")},onFriendCancelClick:function(){cc.log("\u83b7\u53d6\u597d\u53cb\u6392\u884c\u699c\u6570\u636e\u3002x1")},onStartClick:function(){cc.director.loadScene("gameScene")},onShareClick:function(){cc.log("\u70b9\u51fb\u5206\u4eab\u6309\u94ae"),cc.loader.loadRes("pics/logo",function(e,t){wx.shareAppMessage({title:"\u4e0d\u6015\uff0c\u5c31\u6765PK\uff01",imageUrl:t.url,success:function(e){console.log("\u8f6c\u53d1\u6210\u529f!!!")},fail:function(e){console.log("\u8f6c\u53d1\u5931\u8d25!!!")}})})},onGameClick:function(){},onRankClick:function(){},onSoundClick:function(){},_updateSubDomainCanvas:function(){void 0!=window.sharedCanvas&&(this.tex.initWithElement(window.sharedCanvas),this.tex.handleLoadedTexture(),this.rankingScrollView.spriteFrame=new cc.SpriteFrame(this.tex))},update:function(e){this.isClick&&this._updateSubDomainCanvas()}}),cc._RF.pop()},{}]},{},["Board","Circle","Config","EnableCollider","Hammer","Shape","game","piece","start","Util"]);