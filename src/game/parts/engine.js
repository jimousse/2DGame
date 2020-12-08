class Engine {
  constructor(render, update) {
    this.animatedFrameRequest;
    this.tickLength = 1000/60;
    this.update = update;
    this.render = render;
  }

  run(tFrame) {
    // theorical next tick
    const nextTick = this.lastTick + this.tickLength;
    let numTicks = 0;

    // we're late, let's count the ticks we missed
    if (tFrame > nextTick) {
      numTicks = Math.floor((tFrame - this.lastTick) / this.tickLength);
    }

    // apply an update for each tick we missed
    for (let i=0; i<numTicks; i++) {
      this.lastTick = this.lastTick + this.tickLength;
      this.update();
    }

    this.render();
    this.animatedFrameRequest = window.requestAnimationFrame(this.handleRun);

  }

  start() {
    this.lastTick = performance.now();
    this.handleRun = (t) => this.run(t);
    this.animatedFrameRequest = window.requestAnimationFrame(this.handleRun);
  }

  stop() {
    window.cancelAnimationFrame(this.animatedFrameRequest);
  }
}

export default Engine;