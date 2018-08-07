class BugReport {
    constructor(bug, priority) {
        this.bug = bug;
        this.time = new Date();
        this.priority = priority;
    }
    getTimeStamp() {
        return this.time.toString();
    }
}

class BugList {
    constructor() {
        this.bugs = [];
    }
    getBug() {
        if(this.bugs.length > 0) {
            return this.bugs.shift();
        }
        return null;
    }
    addBug(bugText, priority) {
        let bug = new BugReport(bugText, priority);
        let currentBugsLength = this.bugs.length;
        if(currentBugsLength === 0) {
            this.bugs.unshift(bug);
        } else {
            let lastIndexAtSameOrHigherPriority = null;
            for(let i = 0; i < currentBugsLength; i++) {
                if(bug.priority >= this.bugs[i].priority) {
                    lastIndexAtSameOrHigherPriority = i;
                }
                // if (this.bugs[i].priority >= bug.priority) {
                //     lastIndexAtSameOrHigherPriority = i;
                // }

            }
            // if lastIndex is null, then this has the lowest priority
            if (lastIndexAtSameOrHigherPriority !== 0 && !lastIndexAtSameOrHigherPriority) {
                this.bugs.push(bug);
            } else {
                this.bugs.splice(lastIndexAtSameOrHigherPriority + 1, 0, bug);
            }
        }
    }
}

$(document).ready( () => {
    let bugList = new BugList();
    let hasBugReport = false;

    bugList.addBug('Invisible bears haunt software', 1);
    bugList.addBug('addBug function inexplicably reformats hard drive with the lyrics to "Shake It Off" by Taylor Swift.', 2);
    bugList.addBug('Developers who fail to pass on this bug to three other developers are killed by some sort of ring ghost after a week.', 3);
    bugList.addBug('Software literally filled room with bugs.', 1);


    $('body').on('click', '.left button', () => {
        if(!hasBugReport){
            let bug = bugList.getBug();
            $('#bugTime').text(`Most Recent Reported Date: ${bug.getTimeStamp()}`);
            $('#bugReport').text(`${bug.bug}`);
            $('#bugPriority').text(`${bug.priority}`)
            hasBugReport = true;
        }
    });

    $('body').on('click', '#bugFixed', () => {
        $('#bugTime').text(``);
        $('#bugReport').text(``);
        $('#bugPriority').text(``);
        hasBugReport = false;
    });

    $('body').on('click', '#bugReturned', () => {
        if(hasBugReport) {
            bugList.addBug($('#bugReport').text(), parseInt($('#bugPriority').text()));
            $('#bugTime').text(``);
            $('#bugReport').text(``);
            $('#bugPriority').text(``);
            hasBugReport = false;
            console.log(bugList.bugs);
        }
    });

    $('body').on('click', '#bugSubmit', () => {
        bugList.addBug($('.moreLeft textarea').val(), parseInt($('.moreLeft option:selected').text()));
        $('.moreLeft textarea').val('');
    });
});