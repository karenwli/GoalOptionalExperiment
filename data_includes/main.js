PennController.ResetPrefix(null)

// Turn off debugger
DebugOff()

Header(
// void
)
.log("sonaID", GetURLParameter("id") )

//
Sequence("consent","intro", "intro2", randomize("sentence"), SendResults(), "debrief")


//
newTrial("consent", 
    newHtml("consent-form", "SONAconsentForm.html")
        .center()
        .print()
        //.cssContainer({
        //    "width": "1000px",
        //    "margin": "15px auto"
        //})
    ,
    newButton("I Agree")
        .print()
        .center()
        .wait()
).setOption("hideProgressBar",true)

// ~~~~Intro Code~~~~

newTrial("intro",
    newText("background", "Welcome! In this experiment you will be asked to read \
    several scenarios and evaluate the naturalness of a final sentence in the given context. Try it \
    out with the practice scenario below.") // ADDED 'in the given context' HERE TO MAKE THAT EVEN MORE EXPLICIT [FS]
        .center()
        .print()
    ,
    newText("instructions1", "<b> Please read the following scenario and press space to reveal the final sentence. \
    Then use the scale to rate the naturalness of the final sentence in the context. </b>")
    ,
    newText("context1", "After grocery shopping, Bill started to unpack \
    the groceries from the car.")
    ,            
    newText("target1", "He carried the groceries in his arms.")
    ,
    newScale("scale1", 7)
        .labelsPosition("right")
        .before( newText("label1", "Unnatural"))
        .after(  newText("label2", "Natural"))
        .radio()
        .labelsPosition("bottom")
    ,
    newButton("button1", "Continue")
    ,
    newCanvas("canvas1", 600, 400)
        .add("center at 50%", 30, getText("instructions1"))
        .add("center at 50%", 80, getText("context1"))
        .center()
        .print()
    ,
    newKey("next1"," ")
        .callback(
            getCanvas("canvas1")
                .add("center at 50%",130, getText("target1"))
                .add("center at 50%",220, getScale("scale1"))
                .add("center at 50%",280, getButton("button1").hidden())
        )
    ,
    getScale("scale1")
        .callback(
            getButton("button1")
                .visible()
        )
    ,
    getButton("button1")
        .wait()
)

newTrial("intro2",
    newText("confirmation", "Great job! Remember: your job is to judge the naturalness of the final sentence.")
    ,
    newButton("toExperiment", "Continue to experiment")
    ,
    newCanvas("canvas2", 600, 300)
        .add("center at 50%", 30, getText("confirmation"))
        .add("center at 50%",100, getButton("toExperiment"))
        .center()
        .print()
    ,
    getButton("toExperiment")
        .wait()
    )
// ~~~~Trial Code~~~~

Template("VerbQuantStimuli.csv", row =>
    newTrial("sentence",
        newText("instructions", "<b> Please read the following scenario and press space to reveal the final sentence. \
        Then use the scale to rate the naturalness of the final sentence in the context. </b>")
        ,
        newText("context", row.context1 + " " + row.context2)
        ,            
        newText("target", row.target_sentence)
        ,
        newScale("scale", 7)
            .labelsPosition("right")
            .before( newText("label1", "Unnatural"))
            .after(  newText("label2", "Natural"))
            .radio()
            .labelsPosition("bottom")
        ,
        newButton("button", "Continue")
        ,
        newCanvas("canvas", 600, 400)
            .add("center at 50%",  0, getText("instructions"))
            .add("center at 50%", 80, getText("context"))
            .center()
            .print()
        ,    
        newKey("next", " ")
            .callback(
                getCanvas("canvas")
                    .add("center at 50%",130, getText("target"))
                    .add("center at 50%",220, getScale("scale"))
                    .add("center at 50%",280, getButton("button").hidden())
                    .log() // in case we want to measure response time
            )
        ,
        getScale("scale")
            .log()
            .callback(
                getButton("button")
                    .visible()
            )
        ,
        getButton("button")
            .wait()
    )
    .log("ItemNumber", row.ItemNumber)
    .log("itemType", row.itemType)
    .log("trialGroup", row.group)
    .log("goalIntroduced", row.goal_introduced)
    .log("goalIncluded", row.goal_included)
    .log("quantifier", row.quantifier)
    .log("asPhrase", row.asPhrase)
)

newTrial("debrief", 
    newHtml("debriefing", "debriefing.html")
        .center()
        .print()
        //.cssContainer({
        //    "width": "1000px",
        //    "margin": "15px auto"
        //})
    ,
    newText("<p style=font-size:18px;>Your results have been saved, but you need to validate your participation below.</p>" +
            `<p style=font-size:18px;><a href='https://upenn.sona-systems.com/webstudy_credit.aspx?experiment_id=956&credit_token=afc47fcdd9f141cca5ca5918394e9599&survey_code=${GetURLParameter("id")}'>Click here to confirm submission on Sona</a>.</p>`)
        .center()
        .print()
    ,
    newButton("continue")
        .wait()
)