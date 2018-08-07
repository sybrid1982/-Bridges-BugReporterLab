class BugReport {
    constructor(bug) {
        this.bug = bug;
        this.time = new Date();
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
        this.bugs.unshift(bug);
    }
}

$(document).ready( () => {
    let bugList = new BugList();
    let hasBugReport = false;

    bugList.addBug('Invisible bears haunt software');
    bugList.addBug('Developers who fail to pass on this bug to three other developers are killed by some sort of ring ghost after a week.');
    bugList.addBug('addBug function inexplicably reformats hard drive with the lyrics to "Shake It Off" by Taylor Swift.');

    $('body').on('click', '.left button', () => {
        if(!hasBugReport){
            let bug = bugList.getBug();
            $('#bugTime').text(`Most Recent Reported Date: ${bug.getTimeStamp()}`);
            $('#bugReport').text(`${bug.bug}`);
            hasBugReport = true;
        }
    });

    $('body').on('click', '#bugFixed', () => {
        $('#bugTime').text(``);
        $('#bugReport').text(``);
        hasBugReport = false;
    });

    $('body').on('click', '#bugReturned', () => {
        if(hasBugReport) {
            bugList.addBug($('#bugReport').text());
            $('#bugTime').text(``);
            $('#bugReport').text(``);
            hasBugReport = false;
        }
    });
});