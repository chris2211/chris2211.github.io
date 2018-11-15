__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Board: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2bb35MbW8hDWa+k9hYR/5Tt", "Board");
    "use strict";
    var _Config = require("Config");
    var _Util = require("./util/Util");
    var _Util2 = _interopRequireDefault(_Util);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        hexSide: 4,
        tileH: 110,
        tilePic: {
          default: null,
          type: cc.SpriteFrame
        },
        bomb: {
          default: null,
          type: cc.Prefab
        },
        type1: {
          default: null,
          type: cc.SpriteFrame
        },
        type2: {
          default: null,
          type: cc.SpriteFrame
        },
        type3: {
          default: null,
          type: cc.SpriteFrame
        },
        type4: {
          default: null,
          type: cc.SpriteFrame
        },
        type5: {
          default: null,
          type: cc.SpriteFrame
        },
        type6: {
          default: null,
          type: cc.SpriteFrame
        },
        type7: {
          default: null,
          type: cc.SpriteFrame
        },
        type8: {
          default: null,
          type: cc.SpriteFrame
        }
      },
      start: function start() {
        this.Lock1Node = cc.find("Canvas/StarUnlock/Lock1");
        this.Lock2Node = cc.find("Canvas/StarUnlock/Lock2");
        this.rocket = cc.find("Canvas/rocket");
        this.nice = cc.find("Canvas/nice");
        this.StarLockCount = 2;
        this.totalPopArrs = [];
        this.resultArr = [];
        this.theScore = 0;
      },
      onLoad: function onLoad() {
        this.setHexagonGrid();
        this.node.on("dropSuccess", this.deleteTile, this);
        this.getOldScore();
      },
      onSeekHelpBtnClicked: function onSeekHelpBtnClicked() {
        cc.loader.loadRes("pics/logo", function(err, data) {
          wx.shareAppMessage({
            title: "\u7ecf\u5178\u5c0f\u6e38\u620f\u59cb\u7ec8\u597d\u73a9\u5982\u521d\uff0c\u6765\u5427\uff01\u4e00\u8d77\u6765\u56de\u5473\u5427\uff01",
            imageUrl: data.url,
            success: function success(res) {
              if (null == res.shareTickets || void 0 == res.shareTickets || "" == res.shareTickets) cc.log("res.shareTickets is null"); else {
                cc.log("res.shareTickets is not null");
                res.shareTickets.length > 0;
              }
            },
            fail: function fail(res) {
              console.log("\u8f6c\u53d1\u5931\u8d25!!!");
            }
          });
        });
      },
      getOldScore: function getOldScore() {
        var oldScore = cc.sys.localStorage.getItem("score");
        var node = cc.find("Canvas/Score");
        var label = node.getComponent(cc.Label);
        label.string = Number(oldScore);
      },
      sortCurrTileByAroundNum: function sortCurrTileByAroundNum() {
        var boardFrameList = this.boardFrameList;
        for (var i = 0; i < this.loc.length; i++) cc.log("before this.loc: " + this.loc[i]);
        var c = this.getAroundNum(this.loc[0]);
        var d = this.getAroundNum(this.loc[this.loc.length - 1]);
        c < d && (this.loc = this.loc.reverse());
        for (var _i = 0; _i < this.loc.length; _i++) cc.log("after this.loc: " + this.loc[_i]);
      },
      getAroundNum: function getAroundNum(block) {
        var boardFrameList = this.boardFrameList;
        var idx = Number(block);
        var neighborArr = [];
        var count = 0;
        if (boardFrameList[idx] && boardFrameList[idx].isFulled) {
          neighborArr = _Util2.default.getNeighbors(block);
          for (var i = 0; i < neighborArr.length; i++) boardFrameList[neighborArr[i]].isFulled && idx != Number(neighborArr[i]) && boardFrameList[neighborArr[i]].getChildByName("fillNode").tag == boardFrameList[idx].getChildByName("fillNode").tag && count++;
        }
        return count;
      },
      checkOneBlockCanPop: function checkOneBlockCanPop(block) {
        var boardFrameList = this.boardFrameList;
        this.idxArr = [];
        this.neiArr = [];
        this.sneiArr = [];
        this.tneiArr = [];
        this.uneiArr = [];
        this.zneiArr = [];
        this.fneiArr = [];
        var idx = Number(block);
        if (boardFrameList[idx] && boardFrameList[idx].isFulled) {
          this.tmpArr = _Util2.default.getNeighbors(block);
          for (var i = 0; i < this.tmpArr.length; i++) {
            if (boardFrameList[this.tmpArr[i]].isFulled && idx != Number(this.tmpArr[i]) && boardFrameList[this.tmpArr[i]].getChildByName("fillNode").tag == boardFrameList[idx].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.tmpArr[i]])) {
              this.resultArr.push(boardFrameList[this.tmpArr[i]]);
              this.neiArr = _Util2.default.getNeighbors(String(this.tmpArr[i]));
              for (var j = 0; j < this.neiArr.length; j++) if (boardFrameList[this.neiArr[j]].isFulled && Number(this.tmpArr[i]) != Number(this.neiArr[j]) && boardFrameList[this.tmpArr[i]].getChildByName("fillNode").tag == boardFrameList[this.neiArr[j]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.neiArr[j]])) {
                this.resultArr.push(boardFrameList[this.neiArr[j]]);
                this.sneiArr = _Util2.default.getNeighbors(String(this.neiArr[j]));
                for (var k = 0; k < this.sneiArr.length; k++) if (boardFrameList[this.sneiArr[k]].isFulled && Number(this.neiArr[j]) != Number(this.sneiArr[k]) && boardFrameList[this.neiArr[j]].getChildByName("fillNode").tag == boardFrameList[this.sneiArr[k]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.sneiArr[k]])) {
                  this.resultArr.push(boardFrameList[this.sneiArr[k]]);
                  this.tneiArr = _Util2.default.getNeighbors(String(this.sneiArr[k]));
                  for (var m = 0; m < this.tneiArr.length; m++) if (boardFrameList[this.tneiArr[m]].isFulled && Number(this.tneiArr[m]) != Number(this.sneiArr[k]) && boardFrameList[this.tneiArr[m]].getChildByName("fillNode").tag == boardFrameList[this.sneiArr[k]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.tneiArr[m]])) {
                    this.resultArr.push(boardFrameList[this.tneiArr[m]]);
                    this.uneiArr = _Util2.default.getNeighbors(String(this.tneiArr[m]));
                    for (var n = 0; n < this.uneiArr.length; n++) if (boardFrameList[this.uneiArr[n]].isFulled && Number(this.tneiArr[m]) != Number(this.uneiArr[n]) && boardFrameList[this.tneiArr[m]].getChildByName("fillNode").tag == boardFrameList[this.uneiArr[n]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.uneiArr[n]])) {
                      this.resultArr.push(boardFrameList[this.uneiArr[n]]);
                      this.zneiArr = _Util2.default.getNeighbors(String(this.tneiArr[m]));
                      for (var t = 0; t < this.zneiArr.length; t++) if (boardFrameList[this.zneiArr[t]].isFulled && Number(this.zneiArr[t]) != Number(this.uneiArr[n]) && boardFrameList[this.zneiArr[t]].getChildByName("fillNode").tag == boardFrameList[this.uneiArr[n]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.zneiArr[t]])) {
                        this.resultArr.push(boardFrameList[this.zneiArr[t]]);
                        this.fneiArr = _Util2.default.getNeighbors(String(this.zneiArr[t]));
                        for (var g = 0; g < this.fneiArr.length; g++) boardFrameList[this.fneiArr[g]].isFulled && Number(this.zneiArr[t]) != Number(this.fneiArr[g]) && boardFrameList[this.fneiArr[g]].getChildByName("fillNode").tag == boardFrameList[this.zneiArr[t]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.fneiArr[g]]) && this.resultArr.push(boardFrameList[this.fneiArr[g]]);
                      }
                    }
                  }
                }
              }
            }
            if (this.resultArr.length > 2) {
              this.totalPopArrs.push(this.resultArr);
              this.resultArr = [];
            } else for (var _j = 0; _j < this.resultArr.length; _j++) this.resultArr[_j].isFulled = true;
          }
        }
      },
      changeRange: function changeRange() {
        var fillTiles = this.node.parent.getChildByName("TileContainer").children;
        var fillTilesLength = fillTiles.length;
        for (var i = 0; i < fillTilesLength; i++) {
          var fillTile = fillTiles[i];
          var fillTileScript = fillTile.getComponent("Shape");
          fillTileScript.rangeAdd();
        }
      },
      checkCanPut: function checkCanPut() {
        var fillTiles = this.node.parent.getChildByName("TileContainer").children;
        var fillTilesLength = fillTiles.length;
        for (var i = 0; i < fillTilesLength; i++) {
          var fillTile = fillTiles[i];
          var fillTileScript = fillTile.getComponent("Shape");
          fillTileScript.checkEnd() && this.gameOver();
        }
      },
      deleteTile: function deleteTile(event) {
        var _this = this;
        this.totalPopArrs = [];
        this.resultArr = [];
        this.tmpArr = [];
        this.loc = [];
        this.block = event.detail.msg.trim().split(",");
        for (var i = 0; i < this.block.length - 1; i++) this.loc.push(this.block[i]);
        for (var _i2 = 0; _i2 < this.loc.length; _i2++) {
          this.checkOneBlockCanPop(this.loc[_i2]);
          if (this.totalPopArrs.length > 0) {
            var _loop = function _loop(j) {
              var b = _this.totalPopArrs[j];
              var _loop2 = function _loop2(k) {
                var delNode = b[k].getChildByName("fillNode");
                b[k].isFulled = false;
                var finished = cc.callFunc(function() {
                  delNode.getComponent(cc.Sprite).spriteFrame = null;
                  delNode.opacity = 255;
                  _this.addScore(k);
                }, _this);
                delNode.runAction(cc.sequence(cc.fadeOut(.6), finished));
              };
              for (var k = 1; k < b.length; k++) _loop2(k);
              _this.changeRange();
              _this.totalPopArrs.length > 2 && _this.niceMoveAction();
              var tag = b[0].getChildByName("fillNode").tag;
              var btag = b[0].tag;
              if (tag > 0 && tag <= 7) {
                tag++;
                b[0].getChildByName("fillNode").tag = tag;
                if (8 == tag) if (2 == _this.StarLockCount) {
                  _this.Lock1Node.getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw("resources/pics/daojugaoliang.png"));
                  _this.StarLockCount--;
                } else if (1 == _this.StarLockCount) {
                  _this.Lock2Node.getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw("resources/pics/daojugaoliang.png"));
                  _this.StarLockCount--;
                }
                b[0].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame = _this["type" + tag];
                b[0].isFulled = true;
              } else if (8 == tag) {
                var starBombArr = _Util2.default.getNeighbors(String(btag));
                var _loop3 = function _loop3(_i3) {
                  var delNode = _this.boardFrameList[Number(starBombArr[_i3])];
                  var finished = cc.callFunc(function() {
                    var eff = cc.instantiate(_this.bomb);
                    eff.parent = _this.node.parent;
                    eff.setPosition(delNode.x, delNode.y);
                    cc.fadeOut(.3);
                    delNode.getComponent(cc.Sprite).spriteFrame = _this.tilePic;
                    delNode.opacity = 255;
                    delNode.isFulled = false;
                    b[0].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame = _this.tilePic;
                    b[0].isFulled = false;
                  }, _this);
                  delNode.runAction(cc.sequence(cc.delayTime(.2), finished));
                };
                for (var _i3 = 0; _i3 < starBombArr.length; _i3++) _loop3(_i3);
              }
              var msgContent = b[0].tag + ",";
              var neighborArr = _Util2.default.getNeighbors(String(btag));
              for (var _i4 = 0; _i4 < neighborArr.length; _i4++) if (_this.boardFrameList[neighborArr[_i4]].isFulled) {
                msgContent += neighborArr[_i4];
                msgContent += ",";
              }
              _this.node.emit("dropSuccess", {
                msg: msgContent
              });
            };
            for (var j = 0; j < this.totalPopArrs.length; j++) _loop(j);
          } else this.checkCanPut();
          this.resultArr = [];
          this.totalPopArrs = [];
        }
      },
      addScore: function addScore(count) {
        var addScoreCount = this.scoreRule(count);
        var node = cc.find("Canvas/Score");
        var label = node.getComponent(cc.Label);
        label.string = addScoreCount + Number(label.string);
        this.theScore = Number(label.string);
      },
      scoreRule: function scoreRule(count) {
        var x = count + 1;
        var addScoreCount = x;
        return addScoreCount;
      },
      gameOver: function gameOver() {
        var Failed = cc.find("Canvas/GameOver");
        this.gameOverScore = cc.find("Canvas/GameOver/Score");
        this.gameOverScore.getComponent(cc.Label).string = String(this.theScore);
        Failed.active = true;
        Failed.runAction(cc.fadeIn(.3));
      },
      setHexagonGrid: function setHexagonGrid() {
        var _this2 = this;
        this.hexes = [];
        this.boardFrameList = [];
        this.resultArr = [];
        this.hexSide--;
        for (var q = -this.hexSide; q <= this.hexSide; q++) {
          var r1 = Math.max(-this.hexSide, -q - this.hexSide);
          var r2 = Math.min(this.hexSide, -q + this.hexSide);
          for (var r = r1; r <= r2; r++) {
            var col = q + this.hexSide;
            var row = r - r1;
            this.hexes[col] || (this.hexes[col] = []);
            this.hexes[col][row] = this.hex2pixel({
              q: q,
              r: r
            }, this.tileH);
          }
        }
        this.hexes.forEach(function(hexs) {
          _this2.setSpriteFrame(hexs);
        });
        this.setLogicIdx();
      },
      hex2pixel: function hex2pixel(hex, h) {
        var size = h / 2;
        var x = size * Math.sqrt(3) * (hex.q + hex.r / 2);
        var y = 3 * size / 2 * hex.r;
        return cc.p(x, y);
      },
      setSpriteFrame: function setSpriteFrame(hexes) {
        for (var index = 0; index < hexes.length; index++) {
          var node = new cc.Node("frame");
          var sprite = node.addComponent(cc.Sprite);
          sprite.spriteFrame = this.tilePic;
          node.x = hexes[index].x;
          node.y = hexes[index].y;
          node.parent = this.node;
          hexes[index].spriteFrame = node;
          this.setShadowNode(node);
          this.setFillNode(node);
          this.boardFrameList.push(node);
        }
      },
      resetBoard: function resetBoard() {
        var boardFrameList = this.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) {
          var boardNode = boardFrameList[i];
          boardNode.isFulled || (boardFrameList[i].getComponent(cc.Sprite).spriteFrame = this.tilePic);
        }
      },
      setLogicIdx: function setLogicIdx() {
        var boardFrameList = this.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) boardFrameList[i].tag = i;
      },
      setShadowNode: function setShadowNode(node) {
        var newNode = new cc.Node("frame");
        newNode.addComponent(cc.Sprite);
        newNode.name = "shadowNode";
        newNode.opacity = 150;
        newNode.parent = node;
      },
      setFillNode: function setFillNode(node) {
        var newNode = new cc.Node("frame");
        newNode.addComponent(cc.Sprite);
        newNode.name = "fillNode";
        newNode.parent = node;
      },
      setMoveNode: function setMoveNode(node) {
        var newNode = new cc.Node("frame");
        newNode.addComponent(cc.Sprite);
        newNode.name = "moveNode";
        newNode.parent = node;
      },
      onRestartClick: function onRestartClick() {
        cc.director.loadScene("gameScene");
      },
      spriteMoveAction: function spriteMoveAction() {
        var moveTo = cc.moveTo(3, cc.v2(520, 68)).easing(cc.easeCircleActionInOut());
        var callfunc = cc.callFunc(function() {
          cc.delayTime(.5);
          this.rocket.setPosition(-540, 276);
        }, this);
        this.rocket.runAction(cc.sequence(moveTo, callfunc));
      },
      niceMoveAction: function niceMoveAction() {
        var moveTo = cc.moveTo(2, cc.v2(26, 351)).easing(cc.easeCubicActionInOut());
        var callfunc = cc.callFunc(function() {
          cc.fadeOut(1);
          this.nice.setPosition(612, 351);
        }, this);
        this.nice.runAction(cc.sequence(moveTo, callfunc));
      },
      onRocketBtnClick: function onRocketBtnClick() {
        var _this3 = this;
        var idx = _Util2.default.getRandomInt(0, 7);
        this.spriteMoveAction();
        var _loop4 = function _loop4(i) {
          cc.log(_Config.RocketLine[idx][i]);
          var delNode = _this3.boardFrameList[Number(_Config.RocketLine[idx][i])].getChildByName("fillNode");
          _this3.boardFrameList[Number(_Config.RocketLine[idx][i])].isFulled = false;
          var finished = cc.callFunc(function() {
            var eff = cc.instantiate(_this3.bomb);
            eff.parent = _this3.node.parent;
            eff.setPosition(delNode.x, delNode.y);
            delNode.getComponent(cc.Sprite).spriteFrame = _this3.tilePic;
            delNode.opacity = 255;
          }, _this3);
          delNode.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(.3), finished));
        };
        for (var i = 0; i < _Config.RocketLine[idx].length; i++) _loop4(i);
      },
      eff: function eff() {
        var boardFrameList = this.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) boardFrameList[i].isFulled && boardFrameList[i].getChildByName("fillNode").runAction(cc.sequence(cc.delayTime(.1), cc.scaleTo(1, .9)));
      },
      update: function update(dt) {
        this.eff();
      }
    });
    cc._RF.pop();
  }, {
    "./util/Util": "Util",
    Config: "Config"
  } ],
  Circle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56b66UhwpFPsqofgW89t+EY", "Circle");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 1
      },
      start: function start() {},
      updateCircle: function updateCircle() {
        this.node.rotation += this.speed;
        this.node.rotation >= 360 && (this.node.rotation -= 360);
      },
      update: function update(dt) {
        this.updateCircle();
      }
    });
    cc._RF.pop();
  }, {} ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c83ferrDsdJx4L++guKEIwB", "Config");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DelRules = [ [ 0, 1, 2, 3, 4 ], [ 5, 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15, 16, 17 ], [ 18, 19, 20, 21, 22, 23, 24, 25 ], [ 26, 27, 28, 29, 30, 31, 32, 33, 34 ], [ 35, 36, 37, 38, 39, 40, 41, 42 ], [ 43, 44, 45, 46, 47, 48, 49 ], [ 50, 51, 52, 53, 54, 55 ], [ 56, 57, 58, 59, 60 ], [ 26, 35, 43, 50, 56 ], [ 18, 27, 36, 44, 51, 57 ], [ 11, 19, 28, 37, 45, 52, 58 ], [ 5, 12, 20, 29, 38, 46, 53, 59 ], [ 0, 6, 13, 21, 30, 39, 47, 54, 60 ], [ 1, 7, 14, 22, 31, 40, 48, 55 ], [ 2, 8, 15, 23, 32, 41, 49 ], [ 3, 9, 16, 24, 33, 42 ], [ 4, 10, 17, 25, 34 ], [ 0, 5, 11, 18, 26 ], [ 1, 6, 12, 19, 27, 35 ], [ 2, 7, 13, 20, 28, 36, 43 ], [ 3, 8, 14, 21, 29, 37, 44, 50 ], [ 4, 9, 15, 22, 30, 38, 45, 51, 56 ], [ 10, 16, 23, 31, 39, 46, 52, 57 ], [ 17, 24, 32, 40, 47, 53, 58 ], [ 25, 33, 41, 48, 54, 59 ], [ 34, 42, 49, 55, 60 ] ];
    var RocketLine = [ [ 3, 8, 14, 21 ], [ 2, 7, 13, 20, 27 ], [ 1, 6, 12, 19, 26, 32 ], [ 0, 5, 11, 18, 25, 31, 36 ], [ 4, 10, 17, 24, 30, 35 ], [ 9, 16, 23, 29, 34 ], [ 15, 22, 28, 33 ] ];
    var Tiles = [ {
      type: 1,
      list: [ [ [ 0, 0 ] ] ]
    }, {
      type: 2,
      list: [ [ [ 0, 0 ], [ 1, 0 ] ] ]
    }, {
      type: 3,
      list: [ [ [ 0, 0 ], [ 1, 0 ] ] ]
    }, {
      type: 4,
      list: [ [ [ 1, -1 ], [ 0, 0 ] ] ]
    }, {
      type: 5,
      list: [ [ [ 1, -1 ], [ 1, 0 ] ] ]
    }, {
      type: 6,
      list: [ [ [ 1, -1 ], [ 0, 0 ] ], [ [ 0, 0 ], [ 1, 0 ] ] ]
    } ];
    exports.default = {
      DelRules: DelRules,
      Tiles: Tiles,
      RocketLine: RocketLine
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  EnableCollider: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64cccjTxd9NnaJHWcg1tJHH", "EnableCollider");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        is_enbale: true,
        is_debug: true
      },
      start: function start() {
        if (true == this.is_enbale) {
          var manager = cc.director.getCollisionManager();
          manager.enabled = true;
          manager.enabledDebugDraw = false;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Hammer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4512nSFexIBr5Kiqu2K+g/", "Hammer");
    "use strict";
    var _Board = require("Board");
    var _Board2 = _interopRequireDefault(_Board);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        Count: 3,
        board: {
          default: null,
          type: _Board2.default
        }
      },
      onLoad: function onLoad() {
        this.addTouchEvent();
        this.HammerCntLabel = cc.find("Canvas/HCount").getComponent(cc.Label);
      },
      start: function start() {
        this.node.ox = this.node.x;
        this.node.oy = this.node.y;
        this.markedTile = null;
        this.HammerCntLabel.string = String(this.Count);
      },
      addTouchEvent: function addTouchEvent() {
        var _this = this;
        this.node.on("touchstart", function(event) {
          _this.node.setScale(1.2);
          _this.boardTiles = [];
        });
        this.node.on("touchmove", function(event) {
          var _event$touch$getDelta = event.touch.getDelta(), x = _event$touch$getDelta.x, y = _event$touch$getDelta.y;
          _this.node.x += 1.1 * x;
          _this.node.y += 1.1 * y;
          _this.checkCollision();
          _this.dropPrompt(true);
        });
        this.node.on("touchend", function() {
          _this.removeTile1();
        });
        this.node.on("touchcancel", function() {
          _this.removeTile1();
        });
      },
      iterateRestore: function iterateRestore() {
        var boardFrameList = this.board.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) {
          var fillNode = boardFrameList[i].getChildByName("fillNode");
          fillNode.opacity = 255;
        }
      },
      removeTile1: function removeTile1() {
        if (null != this.markedTile) if (this.Count >= 1) {
          this.markedTile.isFulled = false;
          this.markedTile.getChildByName("fillNode").tag = -1;
          this.markedTile.getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame = null;
          this.Count--;
          this.HammerCntLabel.string = String(this.Count);
          this.markedTile = null;
        } else this.markedTile.getChildByName("fillNode").opacity = 255;
        this.iterateRestore();
        this.backSourcePos();
      },
      removeTile: function removeTile() {
        if (this.Count >= 1) {
          var boardTiles = this.boardTiles;
          cc.log("length: " + boardTiles.length);
          if (this.boardTiles.length > 0 && this) {
            boardTiles[0].isFulled = false;
            boardTiles[0].getChildByName("fillNode").tag = -1;
            boardTiles[0].getChildByName("fillNode").getComponent(cc.Sprite).spriteFrame = null;
            this.backSourcePos();
            this.Count--;
            this.HammerCntLabel.string = String(this.Count);
            this.iterateRestore();
          }
          this.backSourcePos();
        } else this.backSourcePos();
      },
      backSourcePos: function backSourcePos() {
        this.node.x = this.node.ox;
        this.node.y = this.node.oy;
      },
      checkCollision: function checkCollision() {
        var tile = this.node;
        this.boardTiles = [];
        var pos = this.node.position;
        var boardTile = this.checkDistance(pos);
        boardTile && this.boardTiles.push(boardTile);
      },
      checkDistance: function checkDistance(pos) {
        var distance = 30;
        var boardFrameList = this.board.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) {
          var frameNode = boardFrameList[i];
          if (frameNode.isFulled) {
            var nodeDistance = cc.pDistance(frameNode.position, pos);
            if (nodeDistance <= distance) return frameNode;
          }
        }
      },
      resetBoardFrames: function resetBoardFrames() {
        var boardFrameList = this.board.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) {
          var shadowNode = boardFrameList[i].getChildByName("shadowNode");
          shadowNode.opacity = 0;
        }
      },
      dropPrompt: function dropPrompt() {
        if (this.Count <= 0) return;
        var boardTiles = this.boardTiles;
        var boardTilesLength = boardTiles.length;
        this.resetBoardFrames();
        for (var i = 0; i < boardTilesLength; i++) {
          var fillNode = boardTiles[i].getChildByName("fillNode");
          fillNode.opacity = 100;
          this.markedTile = boardTiles[i];
          return;
        }
      }
    });
    cc._RF.pop();
  }, {
    Board: "Board"
  } ],
  Shape: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e7f22C7WdHQLHhDwpJq4dg", "Shape");
    "use strict";
    var _Board = require("Board");
    var _Board2 = _interopRequireDefault(_Board);
    var _Config = require("Config");
    var _Util = require("./util/Util");
    var _Util2 = _interopRequireDefault(_Util);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var getRandomInt = function getRandomInt(min, max) {
      var ratio = cc.random0To1();
      return min + Math.floor((max - min) * ratio);
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        tileH: 122,
        tileScale: .7,
        turn: 1,
        board: {
          default: null,
          type: _Board2.default
        },
        type1: {
          default: null,
          type: cc.SpriteFrame
        },
        type2: {
          default: null,
          type: cc.SpriteFrame
        },
        type3: {
          default: null,
          type: cc.SpriteFrame
        },
        type4: {
          default: null,
          type: cc.SpriteFrame
        },
        type5: {
          default: null,
          type: cc.SpriteFrame
        },
        type6: {
          default: null,
          type: cc.SpriteFrame
        },
        type7: {
          default: null,
          type: cc.SpriteFrame
        },
        type8: {
          default: null,
          type: cc.SpriteFrame
        }
      },
      onLoad: function onLoad() {
        this.range = 2;
        this.setTile();
        this.addTouchEvent();
      },
      start: function start() {
        this.TurnCntLabel = cc.find("Canvas/TCount").getComponent(cc.Label);
        this.TurnCntLabel.string = String(this.turn);
      },
      rangeAdd: function rangeAdd() {
        cc.log("rangeAdd!!");
        this.range < 7 && (this.range += 1);
      },
      setTile1: function setTile1() {
        var _this = this;
        this.tiles = _Config.Tiles;
        var hexData = this.random1();
        var hexPx = hexData.list.map(function(hexArr) {
          return _this.hex2pixel(hexArr, _this.tileH);
        });
        this.setSpriteFrame(hexPx);
        this.node.scale = this.tileScale;
        this.node.ox = this.node.x;
        this.node.oy = this.node.y;
      },
      setTile: function setTile() {
        var _this2 = this;
        this.tiles = _Config.Tiles;
        var hexData = this.random();
        var hexPx = hexData.list.map(function(hexArr) {
          return _this2.hex2pixel(hexArr, _this2.tileH);
        });
        this.setSpriteFrame(hexPx);
        this.node.scale = this.tileScale;
        this.node.ox = this.node.x;
        this.node.oy = this.node.y;
      },
      random1: function random1() {
        var shape = this.tiles[0];
        var list = shape.list[0];
        return {
          type: shape.type,
          list: list
        };
      },
      random: function random() {
        var shape = this.tiles[getRandomInt(0, this.tiles.length)];
        var list = shape.list[getRandomInt(0, shape.list.length)];
        return {
          type: shape.type,
          list: list
        };
      },
      hex2pixel: function hex2pixel(hexArr, h) {
        var size = h / 2;
        var x = size * Math.sqrt(3) * (hexArr[0] + hexArr[1] / 2);
        var y = 3 * size / 2 * hexArr[1];
        return cc.p(x, y);
      },
      setSpriteFrame: function setSpriteFrame(hexes) {
        for (var index = 0; index < hexes.length; index++) {
          var node = new cc.Node("frame");
          var sprite = node.addComponent(cc.Sprite);
          var hexData = this.random();
          cc.log("this.range: " + this.range);
          var idx = getRandomInt(1, this.range);
          sprite.spriteFrame = this["type" + idx];
          node.x = hexes[index].x;
          node.y = hexes[index].y;
          node.parent = this.node;
          node.tag = idx;
          node.isBuilding = false;
        }
      },
      onTurnBtn: function onTurnBtn() {
        if (this.turn >= 1) {
          this.turn--;
          this.resetTile();
          this.TurnCntLabel.string = String(this.turn);
        }
      },
      onReverseBtn: function onReverseBtn() {
        if (2 == this.node.children.length) {
          var x = this.node.children[0].x;
          var y = this.node.children[0].y;
          this.node.children[0].setPosition(this.node.children[1].x, this.node.children[1].y);
          this.node.children[1].setPosition(x, y);
        }
      },
      addTouchEvent: function addTouchEvent() {
        var _this3 = this;
        this.node.on("touchstart", function(event) {
          _this3.node.setScale(1);
          _this3.node.children.forEach(function(child) {
            child.setScale(1.1);
          });
          _this3.boardTiles = [];
          _this3.fillTiles = [];
        });
        this.node.on("touchmove", function(event) {
          var _event$touch$getDelta = event.touch.getDelta(), x = _event$touch$getDelta.x, y = _event$touch$getDelta.y;
          _this3.node.x += x;
          _this3.node.y += y;
          _this3.checkCollision();
          _this3.checkCanDrop() ? _this3.dropPrompt(true) : _this3.dropPrompt(false);
        });
        this.node.on("touchend", function() {
          _this3.tileDrop();
        });
        this.node.on("touchcancel", function() {
          _this3.tileDrop();
        });
      },
      tileDrop: function tileDrop() {
        this.resetBoardFrames();
        if (this.checkCanDrop()) {
          var boardTiles = this.boardTiles;
          var fillTiles = this.fillTiles;
          var fillTilesLength = fillTiles.length;
          this.locations = [];
          for (var i = 0; i < fillTilesLength; i++) {
            var boardTile = boardTiles[i];
            var fillTile = fillTiles[i];
            var fillNode = boardTile.getChildByName("fillNode");
            var spriteFrame = fillTile.getComponent(cc.Sprite).spriteFrame;
            boardTile.isFulled = true;
            fillNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            fillNode.tag = fillTile.tag;
            this.locations.push(boardTile.tag);
            this.checkCurBoard() ? this.resetTile1() : this.resetTile();
          }
          this.board.curTileLength = fillTiles.length;
          var msgContent = "";
          for (var _i = this.locations.length - 1; _i >= 0; _i--) {
            msgContent += this.locations[_i];
            msgContent += ",";
          }
          this.board.node.emit("dropSuccess", {
            msg: msgContent
          });
        } else this.backSourcePos();
      },
      checkCurBoard: function checkCurBoard() {
        var boardFrameList = this.board.boardFrameList;
        var boardFrameListLength = boardFrameList.length;
        var count = 0;
        for (var i = 0; i < boardFrameListLength; i++) {
          var boardNode = boardFrameList[i];
          boardNode.isFulled || count++;
        }
        return count < 14;
      },
      checkLose1: function checkLose1() {
        var boardFrameList = this.board.boardFrameList;
        var boardFrameListLength = boardFrameList.length;
        var count = 0;
        for (var i = 0; i < boardFrameListLength; i++) {
          var boardNode = boardFrameList[i];
          boardNode.isFulled && count++;
        }
        return 37 == count;
      },
      checkEnd: function checkEnd() {
        if (!this.checkCurBoard()) return false;
        this.checkCollision();
        if (this.checkDrop()) return !!this.checkLose1();
      },
      checkLose: function checkLose() {
        var tiles = this.node.children;
        var tilesLength = tiles.length;
        var boardFrameList = this.board.boardFrameList;
        var boardFrameListLength = boardFrameList.length;
        this.tmpArr = [];
        this.resultArr = [];
        this.neiArr = [];
        this.sneiArr = [];
        for (var i = 0; i < boardFrameListLength; i++) {
          var boardNode = boardFrameList[i];
          if (!boardNode.isFulled) {
            for (var j = 0; j < tilesLength; j++) {
              this.tmpArr = _Util2.default.getNeighbors(String(boardNode.tag));
              for (var k = 0; k < this.tmpArr.length; k++) if (boardFrameList[this.tmpArr[k]].isFulled && Number(boardNode.tag) != Number(this.tmpArr[k]) && tiles[j].tag == boardFrameList[this.tmpArr[k]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.tmpArr[k]])) {
                this.resultArr.push(boardFrameList[this.tmpArr[k]]);
                this.neiArr = _Util2.default.getNeighbors(String(this.tmpArr[k]));
                for (var m = 0; m < this.neiArr.length; m++) if (boardFrameList[this.neiArr[m]].isFulled && Number(this.neiArr[m]) != Number(this.tmpArr[k]) && boardFrameList[this.neiArr[m]].getChildByName("fillNode").tag == boardFrameList[this.tmpArr[k]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.neiArr[m]])) {
                  this.resultArr.push(boardFrameList[this.neiArr[m]]);
                  this.sneiArr = _Util2.default.getNeighbors(String(this.tmpArr[k]));
                  for (var n = 0; n < this.sneiArr.length; n++) boardFrameList[this.sneiArr[n]].isFulled && Number(this.sneiArr[n]) != Number(this.neiArr[m]) && boardFrameList[this.sneiArr[n]].getChildByName("fillNode").tag == boardFrameList[this.neiArr[m]].getChildByName("fillNode").tag && -1 == this.resultArr.indexOf(boardFrameList[this.sneiArr[n]]) && this.resultArr.push(boardFrameList[this.neiArr[n]]);
                }
              }
            }
            if (this.resultArr.length >= 2) {
              this.resultArr = [];
              return false;
            }
          }
        }
        return true;
      },
      checkDrop: function checkDrop() {
        var canDropCount = 0;
        var tiles = this.node.children;
        var tilesLength = tiles.length;
        var boardFrameList = this.board.boardFrameList;
        var boardFrameListLength = boardFrameList.length;
        for (var i = 0; i < boardFrameListLength; i++) {
          var boardNode = boardFrameList[i];
          var srcPos = cc.p(boardNode.x, boardNode.y);
          var count = 0;
          if (!boardNode.isFulled) {
            for (var j = 0; j < tilesLength; j++) {
              var len = 50;
              var tilePos = cc.pAdd(srcPos, cc.p(tiles[j].x, tiles[j].y));
              for (var k = 0; k < boardFrameListLength; k++) {
                var _boardNode = boardFrameList[k];
                var dis = cc.pDistance(cc.p(_boardNode.x, _boardNode.y), tilePos);
                dis <= len && !_boardNode.isFulled && count++;
              }
            }
            count === tilesLength && canDropCount++;
          }
        }
        return 0 === canDropCount;
      },
      resetTile: function resetTile() {
        this.node.removeAllChildren();
        this.node.x = this.node.ox;
        this.node.y = this.node.oy;
        this.setTile();
      },
      resetTile1: function resetTile1() {
        this.node.removeAllChildren();
        this.node.x = this.node.ox;
        this.node.y = this.node.oy;
        this.setTile1();
      },
      backSourcePos: function backSourcePos() {
        this.node.scale = this.tileScale;
        this.node.x = this.node.ox;
        this.node.y = this.node.oy;
        this.node.children.forEach(function(child) {
          child.setScale(1);
        });
      },
      checkCollision: function checkCollision() {
        var tiles = this.node.children;
        this.boardTiles = [];
        this.fillTiles = [];
        for (var i = 0; i < tiles.length; i++) {
          var tile = tiles[i];
          var pos = cc.pAdd(this.node.position, tile.position);
          var boardTile = this.checkDistance(pos);
          if (boardTile) {
            this.fillTiles.push(tile);
            this.boardTiles.push(boardTile);
          }
        }
      },
      checkDistance: function checkDistance(pos) {
        var distance = 50;
        var boardFrameList = this.board.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) {
          var frameNode = boardFrameList[i];
          var nodeDistance = cc.pDistance(frameNode.position, pos);
          if (nodeDistance <= distance) return frameNode;
        }
      },
      checkCanDrop: function checkCanDrop() {
        var boardTiles = this.boardTiles;
        var fillTiles = this.node.children;
        var boardTilesLength = boardTiles.length;
        var fillTilesLength = fillTiles.length;
        if (0 === boardTilesLength || boardTilesLength != fillTilesLength) return false;
        for (var i = 0; i < boardTilesLength; i++) if (this.boardTiles[i].isFulled) return false;
        return true;
      },
      resetBoardFrames: function resetBoardFrames() {
        var boardFrameList = this.board.boardFrameList;
        for (var i = 0; i < boardFrameList.length; i++) {
          var shadowNode = boardFrameList[i].getChildByName("shadowNode");
          shadowNode.opacity = 0;
        }
      },
      dropPrompt: function dropPrompt(canDrop) {
        var boardTiles = this.boardTiles;
        var boardTilesLength = boardTiles.length;
        var fillTiles = this.fillTiles;
        this.resetBoardFrames();
        if (canDrop) for (var i = 0; i < boardTilesLength; i++) {
          var shadowNode = boardTiles[i].getChildByName("shadowNode");
          shadowNode.opacity = 100;
          var spriteFrame = fillTiles[i].getComponent(cc.Sprite).spriteFrame;
          shadowNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
      }
    });
    cc._RF.pop();
  }, {
    "./util/Util": "Util",
    Board: "Board",
    Config: "Config"
  } ],
  Util: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f151PisGVJAKNTI3GsmFYp", "Util");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _ = {
      arrIntersect: function arrIntersect(arr1, arr2) {
        var intersectArr = [];
        for (var _i = 0; _i < arr1.length; _i++) for (var j = 0; j < arr2.length; j++) arr2[j] == arr1[_i] && intersectArr.push(arr2[j]);
        return intersectArr;
      },
      arrUnion: function arrUnion(arr1, arr2, exclude1, exclude2) {
        var unionArr = [];
        for (var _i2 = 0; _i2 < arr1.length; _i2++) arr1[_i2] != exclude1 && unionArr.push(arr1[_i2]);
        for (leti = 0; i < arr2.length; i++) arr2[i] != exclude2 && unionArr.push(arr2[i]);
        return unionArr;
      },
      checkArrIsEqual: function checkArrIsEqual(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) if (arr2[i] != arr1[i]) return false;
        return true;
      },
      getNeighbors: function getNeighbors(loc) {
        var resultArr = [];
        switch (loc) {
         case "3":
          resultArr.push(8);
          resultArr.push(7);
          resultArr.push(2);
          break;

         case "8":
          resultArr.push(14);
          resultArr.push(13);
          resultArr.push(7);
          resultArr.push(3);
          break;

         case "14":
          resultArr.push(21);
          resultArr.push(20);
          resultArr.push(13);
          resultArr.push(8);
          break;

         case "21":
          resultArr.push(27);
          resultArr.push(20);
          resultArr.push(14);
          break;

         case "2":
          resultArr.push(3);
          resultArr.push(7);
          resultArr.push(6);
          resultArr.push(1);
          break;

         case "7":
          resultArr.push(8);
          resultArr.push(13);
          resultArr.push(12);
          resultArr.push(6);
          resultArr.push(2);
          resultArr.push(3);
          break;

         case "13":
          resultArr.push(14);
          resultArr.push(20);
          resultArr.push(19);
          resultArr.push(12);
          resultArr.push(7);
          resultArr.push(8);
          break;

         case "20":
          resultArr.push(27);
          resultArr.push(26);
          resultArr.push(19);
          resultArr.push(21);
          resultArr.push(13);
          resultArr.push(14);
          break;

         case "27":
          resultArr.push(32);
          resultArr.push(26);
          resultArr.push(20);
          resultArr.push(14);
          break;

         case "1":
          resultArr.push(2);
          resultArr.push(6);
          resultArr.push(5);
          resultArr.push(0);
          break;

         case "6":
          resultArr.push(7);
          resultArr.push(12);
          resultArr.push(11);
          resultArr.push(5);
          resultArr.push(1);
          resultArr.push(2);
          break;

         case "12":
          resultArr.push(13);
          resultArr.push(19);
          resultArr.push(18);
          resultArr.push(11);
          resultArr.push(6);
          resultArr.push(7);
          break;

         case "19":
          resultArr.push(20);
          resultArr.push(26);
          resultArr.push(25);
          resultArr.push(18);
          resultArr.push(12);
          resultArr.push(13);
          break;

         case "26":
          resultArr.push(27);
          resultArr.push(32);
          resultArr.push(31);
          resultArr.push(25);
          resultArr.push(19);
          resultArr.push(20);
          break;

         case "32":
          resultArr.push(36);
          resultArr.push(31);
          resultArr.push(26);
          resultArr.push(27);
          break;

         case "0":
          resultArr.push(1);
          resultArr.push(5);
          resultArr.push(4);
          break;

         case "5":
          resultArr.push(6);
          resultArr.push(11);
          resultArr.push(10);
          resultArr.push(4);
          resultArr.push(0);
          resultArr.push(1);
          break;

         case "11":
          resultArr.push(12);
          resultArr.push(18);
          resultArr.push(17);
          resultArr.push(10);
          resultArr.push(5);
          resultArr.push(6);
          break;

         case "18":
          resultArr.push(19);
          resultArr.push(25);
          resultArr.push(24);
          resultArr.push(17);
          resultArr.push(11);
          resultArr.push(12);
          break;

         case "25":
          resultArr.push(26);
          resultArr.push(31);
          resultArr.push(30);
          resultArr.push(24);
          resultArr.push(18);
          resultArr.push(19);
          break;

         case "31":
          resultArr.push(32);
          resultArr.push(36);
          resultArr.push(35);
          resultArr.push(30);
          resultArr.push(25);
          resultArr.push(26);
          break;

         case "36":
          resultArr.push(35);
          resultArr.push(31);
          resultArr.push(32);
          break;

         case "4":
          resultArr.push(5);
          resultArr.push(10);
          resultArr.push(9);
          resultArr.push(0);
          break;

         case "10":
          resultArr.push(11);
          resultArr.push(17);
          resultArr.push(16);
          resultArr.push(9);
          resultArr.push(4);
          resultArr.push(5);
          break;

         case "17":
          resultArr.push(18);
          resultArr.push(24);
          resultArr.push(23);
          resultArr.push(16);
          resultArr.push(10);
          resultArr.push(11);
          break;

         case "24":
          resultArr.push(25);
          resultArr.push(30);
          resultArr.push(29);
          resultArr.push(23);
          resultArr.push(17);
          resultArr.push(18);
          break;

         case "30":
          resultArr.push(31);
          resultArr.push(35);
          resultArr.push(34);
          resultArr.push(29);
          resultArr.push(24);
          resultArr.push(25);
          break;

         case "35":
          resultArr.push(36);
          resultArr.push(34);
          resultArr.push(30);
          resultArr.push(31);
          break;

         case "9":
          resultArr.push(10);
          resultArr.push(16);
          resultArr.push(15);
          resultArr.push(4);
          break;

         case "16":
          resultArr.push(17);
          resultArr.push(23);
          resultArr.push(22);
          resultArr.push(15);
          resultArr.push(9);
          resultArr.push(10);
          break;

         case "23":
          resultArr.push(24);
          resultArr.push(29);
          resultArr.push(28);
          resultArr.push(22);
          resultArr.push(16);
          resultArr.push(17);
          break;

         case "29":
          resultArr.push(30);
          resultArr.push(34);
          resultArr.push(33);
          resultArr.push(28);
          resultArr.push(23);
          resultArr.push(24);
          break;

         case "34":
          resultArr.push(35);
          resultArr.push(33);
          resultArr.push(29);
          resultArr.push(30);
          break;

         case "15":
          resultArr.push(16);
          resultArr.push(22);
          resultArr.push(9);
          break;

         case "22":
          resultArr.push(23);
          resultArr.push(28);
          resultArr.push(15);
          resultArr.push(16);
          break;

         case "28":
          resultArr.push(29);
          resultArr.push(33);
          resultArr.push(22);
          resultArr.push(23);
          break;

         case "33":
          resultArr.push(34);
          resultArr.push(28);
          resultArr.push(29);
        }
        return resultArr;
      },
      getRandomInt: function getRandomInt(min, max) {
        var ratio = cc.random0To1();
        return min + Math.floor((max - min) * ratio);
      }
    };
    exports.default = _;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "game");
    "use strict";
    var _properties;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var disList = [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7, 8 ], [ 9, 10, 11, 12, 13, 14 ], [ 15, 16, 17, 18, 19, 20, 21 ], [ 22, 23, 24, 25, 26, 27 ], [ 28, 29, 30, 31, 32 ], [ 33, 34, 35, 36 ], [ 26, 35, 43, 50, 56 ], [ 18, 27, 36, 44, 51, 57 ], [ 11, 19, 28, 37, 45, 52, 58 ], [ 5, 12, 20, 29, 38, 46, 53, 59 ], [ 0, 6, 13, 21, 30, 39, 47, 54, 60 ], [ 1, 7, 14, 22, 31, 40, 48, 55 ], [ 2, 8, 15, 23, 32, 41, 49 ], [ 3, 9, 16, 24, 33, 42 ], [ 4, 10, 17, 25, 34 ], [ 0, 5, 11, 18, 26 ], [ 1, 6, 12, 19, 27, 35 ], [ 2, 7, 13, 20, 28, 36, 43 ], [ 3, 8, 14, 21, 29, 37, 44, 50 ], [ 4, 9, 15, 22, 30, 38, 45, 51, 56 ], [ 10, 16, 23, 31, 39, 46, 52, 57 ], [ 17, 24, 32, 40, 47, 53, 58 ], [ 25, 33, 41, 48, 54, 59 ], [ 34, 42, 49, 55, 60 ] ];
    cc.Class({
      extends: cc.Component,
      properties: (_properties = {}, _defineProperty(_properties, "gridLineCount", 4), 
      _defineProperty(_properties, "gridH", 0), _defineProperty(_properties, "gridA", 0), 
      _defineProperty(_properties, "frameSprite", {
        default: null,
        type: cc.SpriteFrame
      }), _properties),
      checkMatch: function checkMatch(arg) {
        cc.error("testtesttest");
      },
      onLoad: function onLoad() {
        var srcPos = cc.p(this.node.x, this.node.y);
        var lbxNodes = [];
        var lbxNodesIndex = 0;
        var maxCount = 2 * this["gridLineCount"] - 1;
        var posList = [ {
          count: 4,
          srcPos: cc.p(0, 0)
        }, {
          count: 5,
          srcPos: cc.p(2 * this["gridH"], 0)
        }, {
          count: 6,
          srcPos: cc.p(4 * this["gridH"], 0)
        }, {
          count: 7,
          srcPos: cc.p(6 * this["gridH"], 0)
        }, {
          count: 6,
          srcPos: cc.p(6 * this["gridH"] + this["gridH"], -3 * this["gridA"] / 2)
        }, {
          count: 5,
          srcPos: cc.p(6 * this["gridH"] + 2 * this["gridH"], -3 * this["gridA"] * 2 / 2)
        }, {
          count: 4,
          srcPos: cc.p(6 * this["gridH"] + 3 * this["gridH"], -3 * this["gridA"] * 3 / 2)
        } ];
        var addVec = cc.pMult(cc.pForAngle(2 * Math.PI / 360 * 240), 2 * this["gridH"]);
        var pianyiTo0p0Vec = cc.pMult(cc.pForAngle(2 * Math.PI / 360 * 120), 2 * this["gridH"] * 4);
        var frameList = [];
        var fPosList = [];
        for (var i = 0; i < posList.length; i++) {
          var count = posList[i].count;
          var oneSrcPos = cc.pAdd(posList[i].srcPos, pianyiTo0p0Vec);
          var aimPos = cc.pAdd(srcPos, oneSrcPos);
          for (var j = 0; j < count; j++) {
            var fpos = cc.pAdd(aimPos, cc.pMult(addVec, j));
            fPosList.push(fpos);
          }
        }
        for (var index = 0; index < fPosList.length; index++) {
          var node = new cc.Node("frame");
          var sprite = node.addComponent(cc.Sprite);
          sprite.spriteFrame = this["frameSprite"];
          node.x = fPosList[index].x;
          node.y = fPosList[index].y;
          node.parent = this.node;
          node.FKIndex = index;
          frameList.push(node);
        }
        this.frameList = frameList;
        this.posList = posList;
        this.node.on("successDropDown", this.checkMatch, this);
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  piece: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "781932YGwFIb4cVVETldBUo", "piece");
    "use strict";
    var _properties;
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var InitBoard = require("game");
    var scaleParam = .7;
    cc.Class({
      extends: cc.Component,
      properties: (_properties = {
        board: {
          default: null,
          type: InitBoard
        }
      }, _defineProperty(_properties, "blockTex", {
        default: null,
        type: cc.SpriteFrame
      }), _defineProperty(_properties, "gridH", 0), _defineProperty(_properties, "gridA", 0), 
      _defineProperty(_properties, "block2", {
        default: null,
        type: cc.SpriteFrame
      }), _properties),
      random: function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      getPieceConfig: function getPieceConfig() {
        var a = this["gridA"];
        var h = this["gridH"];
        var configLists = [ [ cc.p(0, 0) ], [ cc.p(0, 0), cc.p(2 * h, 0) ], [ cc.p(0, 0), cc.p(h, 1.5 * a) ], [ cc.p(0, 0), cc.p(h, 1.5 * -a) ], [ cc.p(0, 0), cc.p(2 * h, 0), cc.p(4 * h, 0) ], [ cc.p(0, 0), cc.p(2 * h, 0), cc.p(3 * h, 1.5 * a) ], [ cc.p(0, 0), cc.p(2 * h, 0), cc.p(3 * h, 1.5 * -a) ], [ cc.p(0, 0), cc.p(2 * h, 0), cc.p(h, 1.5 * a) ], [ cc.p(0, 0), cc.p(2 * h, 0), cc.p(h, 1.5 * -a) ], [ cc.p(0, 0), cc.p(h, 1.5 * a), cc.p(3 * h, 1.5 * a) ], [ cc.p(0, 0), cc.p(h, 1.5 * a), cc.p(2 * h, 3 * a) ], [ cc.p(0, 0), cc.p(h, 1.5 * a), cc.p(0, 3 * a) ], [ cc.p(0, 0), cc.p(h, 1.5 * -a), cc.p(3 * h, 1.5 * -a) ], [ cc.p(0, 0), cc.p(h, 1.5 * -a), cc.p(2 * h, 3 * -a) ], [ cc.p(0, 0), cc.p(h, 1.5 * -a), cc.p(0, 3 * -a) ] ];
        return configLists;
      },
      newBlock: function newBlock() {
        var node = new cc.Node("colorSpr");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this["block2"];
        var wenliNode = new cc.Node("wenliSpr");
        var wenliSprite = wenliNode.addComponent(cc.Sprite);
        wenliSprite.spriteFrame = this["blockTex"];
        wenliNode.parent = node;
        return node;
      },
      newPiece: function newPiece() {
        var blockNode = new cc.Node("block");
        var configList = this.getPieceConfig();
        var randomIdx = this.random(0, configList.length - 1);
        var posList = configList[randomIdx];
        randomIdx = this.random(1, 4);
        var sumX = 0;
        var countX = 0;
        var sumY = 0;
        var countY = 0;
        for (var i = 0; i < posList.length; i++) {
          var pos = posList[i];
          var block = this.newBlock();
          block.x = pos.x;
          sumX += block.x;
          countX++;
          block.y = pos.y;
          sumY += block.y;
          countY++;
          blockNode.addChild(block);
        }
        blockNode.x = -sumX / countX;
        blockNode.y = -sumY / countY;
        blockNode.setScale(scaleParam);
        return blockNode;
      },
      addTouchEvent: function addTouchEvent() {
        var upH = 100;
        var self = this;
        this.node.ox = this.node.x;
        this.node.oy = this.node.y;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          this.y += upH;
          this.getChildByName("block").setScale(1);
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          var delta = event.touch.getDelta();
          this.x += delta.x;
          this.y += delta.y;
          self.collisionFunc();
          self.checkIsCanDrop() ? self.changeColorDeal() : self.changeColorDeal(true);
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          this.dropDownFunc();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
          this.dropDownFunc();
        }, this);
      },
      onLoad: function onLoad() {
        this.checkFrameList = [];
        this.checkFKList = [];
        var newNode = this.newPiece();
        this.node.addChild(newNode);
        this.addTouchEvent();
      }
    });
    cc._RF.pop();
  }, {
    game: "game"
  } ],
  start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee083cZm11PnZ++HY0CLNsG", "start");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        rankingScrollView: cc.Sprite
      },
      start: function start() {
        false;
        this.isClick = false;
      },
      onfriendClick: function onfriendClick() {
        false;
        cc.log("\u83b7\u53d6\u597d\u53cb\u6392\u884c\u699c\u6570\u636e\u3002x1");
      },
      onFriendCancelClick: function onFriendCancelClick() {
        false;
        cc.log("\u83b7\u53d6\u597d\u53cb\u6392\u884c\u699c\u6570\u636e\u3002x1");
      },
      onStartClick: function onStartClick() {
        cc.director.loadScene("gameScene");
      },
      onShareClick: function onShareClick() {
        cc.log("\u70b9\u51fb\u5206\u4eab\u6309\u94ae");
        cc.loader.loadRes("pics/logo", function(err, data) {
          wx.shareAppMessage({
            title: "\u4e0d\u6015\uff0c\u5c31\u6765PK\uff01",
            imageUrl: data.url,
            success: function success(res) {
              console.log("\u8f6c\u53d1\u6210\u529f!!!");
            },
            fail: function fail(res) {
              console.log("\u8f6c\u53d1\u5931\u8d25!!!");
            }
          });
        });
      },
      onGameClick: function onGameClick() {},
      onRankClick: function onRankClick() {},
      onSoundClick: function onSoundClick() {},
      _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (void 0 != window.sharedCanvas) {
          this.tex.initWithElement(window.sharedCanvas);
          this.tex.handleLoadedTexture();
          this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
      },
      update: function update(dt) {
        this.isClick && this._updateSubDomainCanvas();
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Board", "Circle", "Config", "EnableCollider", "Hammer", "Shape", "game", "piece", "start", "Util" ]);
//# sourceMappingURL=project.dev.js.map