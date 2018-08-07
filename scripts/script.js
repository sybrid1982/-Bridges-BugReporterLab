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
            return this.bugs.pop();
        }
        return null;
    }
    addBug(bugText) {
        let bug = new BugReport(bugText);
        if(this.bugs.length === 0) {
            this.bugs.unshift(bug);
        } else {
            let lastIndexAtSameOrHigherPriority = null;
            for(let i = 0; i < this.bugs.length; i++) {
                if (this.bugs.priority >= bug.priority) {
                    lastIndexAtSameOrHigherPriority = i;
                }
                // Ok, if last Index is null, then there are no bugs at the same
                // or higher priority, so insert to the head of the queue
                if (!lastIndexAtSameOrHigherPriority) {
                    this.bugs.push(bug);
                } else {
                    this.bugs.splice(i, 0, bug);
                }
            }
        }
        this.bugs.unshift(bug);
    }
}

$(document).ready( () => {
    let bugList = new BugList();
    let hasBugReport = false;

    bugList.addBug('Invisible bears haunt software', 1);
    bugList.addBug('Developers who fail to pass on this bug to three other developers are killed by some sort of ring ghost after a week.', 3);
    bugList.addBug('addBug function inexplicably reformats hard drive with the lyrics to "Shake It Off" by Taylor Swift.', 2);
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
            bugList.addBug($('#bugReport').text());
            $('#bugTime').text(``);
            $('#bugReport').text(``);
            $('#bugPriority').text(``);
            hasBugReport = false;
        }
    });

    $('body').on('click', '#bugSubmit', () => {
        bugList.addBug($('.moreLeft textarea').val(), $('.moreLeft select').val());
        $('.moreLeft textarea').val('');
    })
});