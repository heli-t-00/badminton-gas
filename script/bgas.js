
    "use strict";
    //Variables to prevent having to get elements every time as it is costly
    let content = null;
    let court = null;
    let zoomed = null;

    let gameselect = null;
    let pointselect = null;
    let editpointselect = null;
    let shotselect = null;
    let editshotselect = null;

    let receiver = null;
    let server = null;
    let receiverimage = null;
    let serverimage = null;
    let shuttle = null;

    //Store positions/settings to allow restore if screen is rotated or resized
    let oldPos = null;
    let rotated = false;
    let zoom = 100;

    //Current game, point and shot to allow editing or playback
    let game = null;
    let editpoint = null;
    let editshot = null;

    // the item being dragged
    let drag = null;
    // offset from top left corner of the element for cursor/touch exact positioning
    let delta = {};

    //The web server to load/save/login
    let webserver = null;

    //Helper functions to get elements
    function getById(id) {
      return document.getElementById(id);
    }
    function getByClass(classname) {
      return document.getElementsByClassName(classname)[0];
    }

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    const csrftoken = getCookie("csrftoken");

    // In DB terms we store a Game with many points each having many shots
    // Games = Id UserId Name
    // Points = GameId Id Total TeamA
    // Shots = PointId Id A1x A1y B1x B1y Sx Sy

    //All positions are 0,0 = center of court in a vertical format at 100% zoom
    class BadShot {
      //Store values at 100% zoom
      constructor(a1x, a1y, b1x, b1y, sx, sy, z = 100) {
        this.a1x = (a1x * 100) / z; // A1 x position
        this.a1y = (a1y * 100) / z; // A1 y position
        this.b1x = (b1x * 100) / z; // B1 x position
        this.b1y = (b1y * 100) / z; // B1 y position
        this.sx = (sx * 100) / z; // Shuttle x position
        this.sy = (sy * 100) / z; // Shuttle y position
      }
      // Return values at a specific zoom
      atZoom(z) {
        return new BadShot(
          (this.a1x * z) / 100, // A1 x position
          (this.a1y * z) / 100, // A1 y position
          (this.b1x * z) / 100, // B1 x position
          (this.b1y * z) / 100, // B1 y position
          (this.sx * z) / 100, // Shuttle x position
          (this.sy * z) / 100 // Shuttle y position
        );
      }
      toCurrent() {
        // console.log(`toCurrent`)
        let bs = this.atZoom(zoom);
        // console.log(`A1=${bs.a1x},${bs.a1y}  B1=${bs.b1x},${bs.b1y}  S=${bs.sx},${bs.sy}`);
        let cr = content.getBoundingClientRect();
        let crx = cr.left + cr.width / 2;
        let cry = cr.top + cr.height / 2;
        let a1r = server.getBoundingClientRect();
        server.style.left =
          (rotated ? bs.a1y : bs.a1x) + crx - a1r.width / 2 + "px";
        server.style.top =
          (rotated ? -bs.a1x : bs.a1y) + cry - a1r.height / 2 + "px";
        let b1r = receiver.getBoundingClientRect();
        receiver.style.left =
          (rotated ? bs.b1y : bs.b1x) + crx - b1r.width / 2 + "px";
        receiver.style.top =
          (rotated ? -bs.b1x : bs.b1y) + cry - b1r.height / 2 + "px";
        let sr = shuttle.getBoundingClientRect();
        shuttle.style.left =
          (rotated ? bs.sy : bs.sx) + crx - sr.width / 2 + "px";
        shuttle.style.top =
          (rotated ? -bs.sx : bs.sy) + cry - sr.height / 2 + "px";
        // console.log(`Restored`)
      }
      fromCurrent() {
        let p = BadShot.fromCurrent();
        this.a1x = p.a1x; // A1 x position
        this.a1y = p.a1y; // A1 y position
        this.b1x = p.b1x; // B1 x position
        this.b1y = p.b1y; // B1 y position
        this.sx = p.sx; // Shuttle x position
        this.sy = p.sy; // Shuttle y position
      }
      static fromCurrent() {
        console.log(`fromCurrent`);
        let cr = content.getBoundingClientRect();
        let crx = cr.left + cr.width / 2;
        let cry = cr.top + cr.height / 2;

        let a1r = server.getBoundingClientRect();
        let a1x = a1r.left + a1r.width / 2 - crx;
        let a1y = a1r.top + a1r.height / 2 - cry;

        let b1r = receiver.getBoundingClientRect();
        let b1x = b1r.left + b1r.width / 2 - crx;
        let b1y = b1r.top + b1r.height / 2 - cry;

        let sr = shuttle.getBoundingClientRect();
        let sx = sr.left + sr.width / 2 - crx;
        let sy = sr.top + sr.height / 2 - cry;

        // console.log(`A1=${JSON.stringify(a1r)}  B1=${JSON.stringify(b1r)}  S=${JSON.stringify(sr)}  C=${JSON.stringify(cr)}  Z=${zoom}`);

        if (rotated) {
          return new BadShot(-a1y, a1x, -b1y, b1x, -sy, sx, zoom);
        } else {
          return new BadShot(a1x, a1y, b1x, b1y, sx, sy, zoom);
        }
      }
    }
    class BadPoint {
      constructor(tp, ap) {
        this.total = tp; //teamA + teamB points or point index 0..57(max)
        this.team_a = ap; //teamA points 0..29(max)
        this.shots = []; // list of shots (all positions for each shot)
      }
    }
    class BadGame {
      constructor(items) {
        this.id = null;
        this.name = "";
        this.user = "{{UserId}}";
        this.created_date = null;
        this.players = [];
        this.players.push(...items); // 2 (or 4 players eventually)
        this.points = []; // list of points
      }
      addPoint(t, ta, shot) {
        let np = new BadPoint(t, ta);
        np.shots.push(shot);
        this.points.push(np);
      }
      isSingles() {
        return this.players.length == 2;
      }
      asJSON() {
        return JSON.stringify(
          this
          //,
          //function (k, v) {
          //return v.toFixed ? Number(v.toFixed(3)) : v;
          //}
        );
      }
      fromJSON(j) {
        console.log(`fromJSON ${JSON.stringify(j)}`);
        let ps = j; //JSON.parse(j);
        this.id = ps.id;
        this.name = ps.name;
        this.user = ps.user;
        this.created_date = ps.created_date;
        console.log(`fromJSON ${this.name}`);
        let nps = [];
        [].forEach.call(ps.points, function (p) {
          console.log(`Point ${p.total}-${p.team_a}`);
          let np = new BadPoint(p.total, p.team_a);
          [].forEach.call(p.shots, function (s) {
            console.log(`Shot ${JSON.stringify(s)}`);
            let ns = new BadShot(s.a1x, s.a1y, s.b1x, s.b1y, s.sx, s.sy);
            np.shots.push(ns);
          });
          nps.push(np);
        });
        this.points = [...nps];
        //console.log(`${this.name}=${this.asJSON()}`);
      }
    }

    // Local Storage Server to use as WebServer
    class LocalServer {
      loadGameNames() {
        let ks = Object.keys(window.localStorage).filter(function (k) {
          return k.startsWith("BGAS.");
        });
        return ks.map((k) => k.replace("BGAS.", ""));
      }
      loadGame(name) {
        window.localStorage.getItem("BGAS." + name);
      }
      saveGame(gamename, gamejson) {
        window.localStorage.setItem("BGAS." + gamename, gamejson);
      }
    }
    // Web Server to load/save game details
    class BadWebServer {
      constructor() {
        let un = username; //Gets username logged in as
        console.log(`User Name=${un}`);
      }
      async loadGameNames() {
        const r = await fetch("{% url 'gas' %}");
        if (!r.ok) {
          throw new Error(`Cannot get list of games: ${r.status}`);
        }
        const ns = await r.json();
        console.log(`Games=${JSON.stringify(ns)}`);
        return ns;
      }
      async loadGame(id) {
        const r = await fetch(`{% url 'gas' %}${id}?format=json`);
        if (!r.ok) {
          throw new Error(`Cannot get game details: ${r.status}`);
        }
        const ns = await r.json();
        console.log(`Game details=${JSON.stringify(ns)}`);
        return ns;
      }
      async saveGame(game) {
        console.log(`Save Game ${game.name}=${game.asJSON()}`);
        let r = null;
        if (game.id) {
          r = await fetch(`{% url 'gas' %}${game.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(game),
          });
        } else {
          r = await fetch(`{% url 'gas' %}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(game),
          });
        }
        if (!r.ok) {
          throw new Error(`Cannot save game details: ${r.status}`);
        }
        const ns = await r.json();
        return ns;
      }
    }

    // When the page loads we initialise everything
    window.onload = function () {
      // Using localstorage as a webserver for now
      webserver = new BadWebServer(new LocalServer());

      console.log(`Find elements`);
      gameselect = getById("gameselect");
      pointselect = getById("pointselect");
      editpointselect = getById("editpointselect");
      shotselect = getById("shotselect");
      editshotselect = getById("editshotselect");

      court = getByClass("court");
      content = getByClass("content");
      zoomed = getByClass("zoomed");

      receiverimage = getById("receiverimage");
      serverimage = getById("serverimage");
      receiver = getByClass("receiver");
      server = getByClass("server");
      shuttle = getByClass("shuttle");

      console.log(`Show court`);
      court.style.opacity = "100%";
      court.style.transition = "opacity 5s";

      // Default start positions
      oldPos = new BadShot(-43.9, -257.8, 85.4, 269.7, -6.7, -184.3);

      console.log(`Setup game`);
      game = new BadGame([server, receiver]);
      game.addPoint(0, 0, BadShot.fromCurrent());

      [].forEach.call(game.players.concat(shuttle), function (draggable) {
        console.log(`Attach drag events to ${draggable.classList[1]}`);
        // Start drag events
        draggable.addEventListener("mousedown", (evt) => {
          evt.preventDefault();
          startdrag(draggable, evt);
        });
        draggable.addEventListener("touchstart", (evt) => {
          evt.preventDefault();
          startdrag(draggable, evt.targetTouches[0]);
        });
        draggable.addEventListener("mouseup", enddrag);
        draggable.addEventListener("touchend", enddrag);
        draggable.addEventListener("touchcancel", enddrag);
      });

      // Additional movement events required to allow dragging
      content.addEventListener("mousemove", (evt) => {
        evt.preventDefault();
        movedrag(content, evt);
      });
      content.addEventListener("touchmove", (evt) => {
        evt.preventDefault();
        movedrag(content, evt.targetTouches[0]);
      });

      // End drag events
      content.addEventListener("mouseup", enddrag);
      content.addEventListener("touchend", enddrag);
      content.addEventListener("touchcancel", enddrag);

      setCourtToSingles();
      showMainMenu();
      fitCourt(content.clientWidth < content.clientHeight);
      pointPlayersAtShuttle();
    };

    function setFooter(footertext) {
      getByClass("footer").innerHTML = footertext;
    }
    function getPos(evt) {
      return {
        x: evt.clientX,
        y: evt.clientY,
      };
    }
    function startdrag(item, evt) {
      let pos = getPos(evt);
      drag = item;
      let rect = item.getBoundingClientRect();
      delta.x = pos.x - rect.x;
      delta.y = pos.y - rect.y;
    }
    function movedrag(item, evt) {
      let pos = getPos(evt);
      if (drag) {
        drag.style.left = pos.x - delta.x + "px";
        drag.style.top = pos.y - delta.y + "px";
        pointPlayersAtShuttle();
      }
    }
    function enddrag(evt) {
      if (drag) {
        evt.preventDefault();
        drag = null;
        oldPos = BadShot.fromCurrent(); //Update stored current positions
        if (editshot) {
          editshot.fromCurrent(); //Update edited shot if set
        }
      }
    }

    window.onresize = function (event) {
      fitCourt(content.clientWidth < content.clientHeight);
    };
    function getAngleToDest(source, dest) {
      let sr = source.getBoundingClientRect();
      let dr = dest.getBoundingClientRect();

      // Get new position from 0,0
      // Use center of each item (left + width / 2)
      let x = dr.left + dr.width / 2 - (sr.left + sr.width / 2);
      let y = dr.top + dr.height / 2 - (sr.top + sr.height / 2);
      return getAngleInDegrees(x, y);
    }
    function getAngleInDegrees(x, y) {
      // Get angle to new position from 0,0
      let angle = Math.round(Math.atan2(y, x) * (180 / Math.PI));
      return angle < 0 ? angle + 360 : angle;
    }
    function pointPlayersAtShuttle() {
      let angle = getAngleToDest(receiver, shuttle);
      receiverimage.style.transform = `rotate(${
        angle + 330
      }deg) translate(0%, 0%)`;
      angle = getAngleToDest(server, shuttle);
      serverimage.style.transform = `rotate(${
        angle + 300
      }deg) translate(0%, 0%)`;
    }

    function rotateCourt() {
      oldPos = BadShot.fromCurrent();
      fitCourt();
    }
    function fitCourt(vertical = null) {
      rotated = zoomed.classList.contains("rotated");
      let remove_class = rotated && vertical !== false;
      let add_class = !rotated && vertical !== true;
      let prect = content.getBoundingClientRect();
      if (remove_class) {
        zoomed.classList.remove("rotated");
        rotated = false;
      } else if (add_class) {
        zoomed.classList.add("rotated");
        rotated = true;
      }

      let zheight =
        (((rotated ? prect.width : prect.height) - 12) / court.clientHeight) *
        100;
      let zwidth =
        (((rotated ? prect.height : prect.width) - 12) / court.clientWidth) *
        100;
      zoom = Math.min(zheight, zwidth); //Set current zoom
      console.log(`Zoom=${zoom}`);
      zoomed.style.zoom = `${zoom}%`;
      serverimage.style.zoom = `${zoom * 0.7}%`;
      receiverimage.style.zoom = `${zoom * 0.7}%`;
      shuttleimage.style.zoom = `${zoom * 0.5}%`;

      //Apply relative positions at new zoom
      oldPos.toCurrent();
      pointPlayersAtShuttle();

      console.log(`zoom=${zoomed.style.zoom} rotated=${rotated}`);
    }

    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    function setCourtToSingles() {
      let col = "black";
      Array.prototype.slice
        .call(document.getElementsByClassName("area"))
        .forEach((de) => {
          if (de.id.includes("2")) de.style.background = col;
        });
    }

    function getOptions(defval, vals, d = true) {
      let options = "";
      if (d) {
        options += `<option value="0" hidden selected>${defval}</option>`;
      }
      vals.forEach((v, i, a) => {
        console.log(`add option ${i}=${v}`);
        options += `<option value="${i}">${v}</option>`;
      });
      return options;
    }
    function getGameNames(defval, vals, d = true) {
      let options = "";
      if (d) {
        options += `<option value="0" hidden selected>${defval}</option>`;
      }
      vals.forEach((v, i, a) => {
        console.log(`add option ${v.id}=${v.name}`);
        options += `<option value="${v.id}">${v.name}</option>`;
      });
      return options;
    }

    function refreshGameNames() {
      setFooter(`Loading games`);
      webserver.loadGameNames().then((ns) => {
        gameselect.innerHTML = getGameNames("Select Game", ns);
        setFooter(`Select or add a new game`);
      });
    }
    function refreshPoints() {
      let allpoints = [...game.points].map(
        (o) => `${o.team_a} - ${o.total - o.team_a}`
      );
      pointselect.innerHTML = getOptions("0 - 0", allpoints, false);
      selectPoint({ selectedIndex: 0 });
    }
    function refreshEditPoints() {
      let allpoints = [...game.points].map(
        (o) => `${o.team_a} - ${o.total - o.team_a}`
      );
      editpointselect.innerHTML = getOptions("0 - 0", allpoints, false);
      editpointselect.value = pointselect.value;
      selectEditPoint({ selectedIndex: pointselect.value });
    }
    function refreshShots() {
      console.log(`refreshShots`);
      console.log(`shots ${shotselect.length}`);
      let allshots = [...editpoint.shots].map(
        (v, i, a) => `${i + 1} of ${a.length}`
      );
      console.log(`allshots ${allshots.length}`);
      shotselect.innerHTML = getOptions("0 of 0", allshots, false);
    }

    function selectGame(item) {
      console.log(`selectGame`);
      let gamename = item.options[item.selectedIndex].text;
      let gameid = item.options[item.selectedIndex].value;
      console.log(`Game Id=${gameid}`);
      loadGame(gameid, gamename);
    }
    function newGame() {
      let gamename = window.prompt(
        "Name of new game",
        "Wang Yihan 0-0 Cheng Shao Chieh (Olympics 2012)"
      );
      if (gamename !== null) {
        if (!gamename)
          gamename = "Wang Yihan 0-0 Cheng Shao Chieh (Olympics 2012)";
        loadGame(undefined, gamename);
      }
    }

    function loadGame(gameid, gamename) {
      // load the game then show the game menu
      console.log(`loadGame ${gameid},${gamename}`);
      if (gamename) {
        // only if a game name has been entered
        if (gameid) {
          webserver.loadGame(gameid).then((loadedgame) => {
            if (loadedgame) {
              game.name = gamename;
              console.log(`loaded Game ${JSON.stringify(loadedgame)}`);
              game.fromJSON(loadedgame);
              console.log(`parsed Game ${game.name}`);
              showGameMenu();
            } else {
              setFooter(`Enter a valid game name`);
            }
          });
        } else {
          // if game does not exist then create a new game
          //game.fromJSON('[{"total":0,"team_a":0,"shots":[{"a1x":-43.8956518954918,"a1y":-257.82076075819674,"b1x":85.40115906762296,"b1y":269.68561091188525,"sx":-6.683817879098361,"sy":-184.3130763319672}]}]');
          let un = "{{user.id}}";
          let defgame = {
            name: gamename,
            user: un,
            points: [
              {
                total: 0,
                team_a: 0,
                shots: [
                  {
                    a1x: -39.193,
                    a1y: -366.424,
                    b1x: 119.596,
                    b1y: 401.732,
                    sx: -32.155,
                    sy: -326.43,
                  },
                ],
              },
            ],
          };
          game.fromJSON(defgame);
          game.id = undefined;
          showGameMenu();
        }
      } else {
        setFooter(`Select or add a new game`);
      }
    }
    function saveGame() {
      // save to web server
      console.log(`saveGame`);
      setFooter(`Game: ${game.name} saving`);

      webserver
        .saveGame(game)
        .then((r) => {
          setFooter(`Game: ${game.name} saved`);
          showMainMenu();
        })
        .catch((error) => {
          setFooter(`Game: ${game.name} ${error.message}`);
        });
      // Check localstorage with console.log(`${JSON.stringify(window.localStorage)}`);
    }

    function showMainMenu() {
      console.log(`showMainMenu`);
      refreshGameNames();
      getByClass("gamemenu").style.display = "none";
      getByClass("editmenu").style.display = "none";
      // getByClass("gamemenu").style.display = "flex";
      // getByClass("editmenu").style.display = "flex";
      getByClass("mainmenu").style.display = "flex";
    }
    function showGameMenu() {
      console.log(`showGameMenu`);
      editshot = null; // No longer allow editing of positions
      refreshPoints();
      getByClass("mainmenu").style.display = "none";
      getByClass("editmenu").style.display = "none";
      getByClass("gamemenu").style.display = "flex";
    }
    function showEditMenu() {
      console.log(`showEditMenu`);
      refreshEditPoints();
      getByClass("mainmenu").style.display = "none";
      getByClass("gamemenu").style.display = "none";
      getByClass("editmenu").style.display = "flex";
    }

    function selectPoint(item) {
      console.log(`selectPoint ${JSON.stringify(item.selectedIndex)}`);
      //Select which point to show and edit
      editpoint = game.points[item.selectedIndex];
      editpoint.shots[0].toCurrent();
      pointPlayersAtShuttle();
      setFooter(
        `Score ${editpoint.team_a} - ${
          editpoint.total - editpoint.team_a
        } for "${game.name}"`
      );
    }
    function playOnePoint() {
      console.log(`playOnePoint`);
      playNextShot(editpoint, 0);
    }
    function playAllPoints() {
      console.log(`playAllPoints`);
      playNextShot(editpoint, 0, true);
      setFooter(
        `Score ${editpoint.team_a} - ${
          editpoint.total - editpoint.team_a
        } for "${game.name}"`
      );
    }
    function playNextShot(point, i, playall = false) {
      let pt = 0.5;
      if (i == 1) {
        server.style.transition = `left ${pt}s, top ${pt}s`;
        server.style.transitionTimingFunction = `linear`;
        receiver.style.transition = `left ${pt}s, top ${pt}s`;
        receiver.style.transitionTimingFunction = `linear`;
        shuttle.style.transition = `left ${pt}s, top ${pt}s`;
        shuttle.style.transitionTimingFunction = `linear`;
      }
      let newShot = point.shots[i];
      /* angle of movement of shuttle to next destination */
      let angle = getAngleInDegrees(
        newShot.sx - oldPos.sx,
        newShot.sy - oldPos.sy
      );
      if (rotated) {
        shuttle.style.transform = `rotate(${angle - 90}deg)`;
      } else {
        shuttle.style.transform = `rotate(${angle}deg)`;
      }
      newShot.toCurrent();

      pointPlayersAtShuttle();
      i = i + 1;
      if (point.shots.length > i) {
        delay(pt * 1000).then(() => {
          playNextShot(point, i, playall);
        });
      } else {
        delay(pt * 2000).then(() => {
          server.style.transition = ``;
          receiver.style.transition = ``;
          shuttle.style.transition = ``;
          //Move to next point
          let ov = +pointselect.value;
          if (ov + 1 < game.points.length) {
            pointselect.value = ov + 1;
            selectPoint({ selectedIndex: ov + 1 });
            if (playall) {
              playNextShot(editpoint, 0, playall);
            }
          }
        });
      }
    }

    function addPointToA() {
      console.log(`addPointToA`);
      let lastpoint = game.points.at(-1);
      if (lastpoint) {
        game.addPoint(
          lastpoint.total + 1,
          lastpoint.team_a + 1,
          BadShot.fromCurrent()
        );
      } else {
        game.addPoint(0, 0, BadShot.fromCurrent());
      }
      refreshEditPoints();
      //Set to last point
      editpointselect.value = game.points.length - 1;
      selectEditPoint({ selectedIndex: game.points.length - 1 });
    }
    function selectEditPoint(item) {
      console.log(`selectEditPoint ${JSON.stringify(item.selectedIndex)}`);
      editpoint = game.points[item.selectedIndex];
      refreshShots();
      selectShot({ selectedIndex: 0 });
    }
    function addPointToB() {
      console.log(`addPointToB`);
      let lastpoint = game.points.at(-1);
      if (lastpoint) {
        game.addPoint(
          lastpoint.total + 1,
          lastpoint.team_a,
          BadShot.fromCurrent()
        );
      } else {
        game.addPoint(0, 0, BadShot.fromCurrent());
      }
      refreshEditPoints();
      //Set to last point
      editpointselect.value = game.points.length - 1;
      selectEditPoint({ selectedIndex: game.points.length - 1 });
    }
    function selectShot(item) {
      console.log(`selectShot ${item.selectedIndex}`);
      editshot = editpoint.shots[item.selectedIndex]; //When set this gets updated by drag drop
      editshot.toCurrent();
      console.log(`Shot ${JSON.stringify(editshot)}`);
      pointPlayersAtShuttle();
      setFooter(
        `Score ${editpoint.team_a} - ${
          editpoint.total - editpoint.team_a
        } shot ${shotselect.options[shotselect.selectedIndex].text} for "${
          game.name
        }"`
      );
    }
    function addShotPrior() {
      console.log(`addShotPrior`);
      //Insert shot at current position (duplicate)
      let ov = +shotselect.value;
      editpoint.shots.splice(ov, 0, BadShot.fromCurrent());
      //Refresh shots
      refreshShots();
      //Set current shot to new shot
      shotselect.value = ov;
      selectShot({ selectedIndex: ov });
    }
    function deleteShot() {
      console.log(`deleteShot`);
      //cannot delete last shot
      if (editpoint.shots.length > 1) {
        let ov = +shotselect.value;
        editpoint.shots.splice(ov, 1); //Delete 1 item
        if (ov >= editpoint.shots.length) {
          ov = editpoint.shots.length - 1;
        }
        //Refresh shots
        refreshShots();
        //Set current shot to new shot
        shotselect.value = ov;
        selectShot({ selectedIndex: ov });
      }
    }
    function addShotNext() {
      console.log(`addShotNext`);
      //Insert shot after current position (duplicate)
      let ov = +shotselect.value;
      editpoint.shots.splice(ov + 1, 0, BadShot.fromCurrent());
      //Refresh shots
      refreshShots();
      //Set current shot to new shot
      shotselect.value = ov + 1;
      selectShot({ selectedIndex: ov + 1 });
    }

