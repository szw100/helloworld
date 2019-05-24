module.exports = app => {
    const Tasks = app.db.models.tasks;

    app.route("/tasks")
        .all((req, res, next)=>{
            console.log(req.body);
            // delete req.body.id;
            next();
        })
        .get((req, res)=>{
            Tasks.findAll({})
                .then(result=> res.json(result))
                .catch(error=>{
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res)=>{
            console.log(req.body);
            Tasks.create(req.body)
                .then(result=> res.json(result))
                .catch(error=>{
                    res.status(412).json({msg: error.message});
                });
        });

    // app.get("/tasks", (req, res)=>{
    //     Tasks.findAll({}).then(tasks=>{
    //         res.json({tasks: tasks})
    //     })
    // });
}