import { StudentCourse } from "../models/course.schema.js"
import { NewStudent } from "../models/newStudent.schema.js"

export const createNewStudent = async(req,res)=>{
    const {firstname,lastname,email,skills,profession,password,isFresher,coursename} = req.body

   const student = await NewStudent.create({firstname,lastname,email,skills,profession,password,isFresher})

   await StudentCourse.create({coursename,studentId:student._id})

    return res.status(200).json({message:"new student onboarded!!!"})
}

export const studentDetails = async(req,res)=>{
    const details = await NewStudent.aggregate([
        // {
            // $lookup:
            // {
            //     from: "studentcourses",
            //     localField: '_id',
            //     foreignField: 'studentId',
            //     as: 'course'
            // },
        // },
        // {
        //     $unwind:"$skills"
        // },
        {
            $bucket:
            {
                groupBy:"$age",
                boundaries:[0,5,20,30],
                default:30,
                output:
                {
                    studentCount:{$sum:1}
                }
            }
        }
    ])
    // const details = await StudentCourse.find()


    return res.json(details)
}

export const updateStudentAge = async(req,res)=>{
    
    const update = await NewStudent.findByIdAndUpdate(req.body.id,{$set:{age:req.body.age}},{new:true})

    return res.json(update)
}