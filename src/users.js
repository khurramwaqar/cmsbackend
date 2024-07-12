import { getDocs, collection } from "firebase/firestore";
import { getDb } from "./firebase"

const collection_name = "users"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []

    doc_refs.forEach(user => {
        res.push({
            id: user.id,
            ...user.data()
        })
    })
    console.log(res);

    return res
}