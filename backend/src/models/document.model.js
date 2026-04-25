import mongoose, {Schema} from "mongoose";

const docSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    effectiveDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    file: {
        type: String,
        required: true
    }, 
    documentType: {
        type: String,
        required: true,
        enum: ["SOP", "HIRA"]
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}, 
    timestamps: true
})

docSchema.virtual('hasExpired').get(function(){
    if(!this.expiryDate){
        console.log("returning false")
        return false;
    } 
    const currDate = new Date()
    return currDate > this.expiryDate
})

export const Doc = mongoose.model('Doc', docSchema);