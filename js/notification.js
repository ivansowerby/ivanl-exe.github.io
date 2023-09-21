const createNotification = (n = 4, ms = 500) => {
    const parent = $("body");
    const notification = addChild(parent, "div", "notification");
    let count = 0
    notification.playKeyframe({
        name: "appear",
        duration: `${ms}ms`,
        iterationCount: n,
        direction: "alternate",
        complete: () => {
            count++;
            if(count >= n) { notification.remove(); }
         }
    });
}