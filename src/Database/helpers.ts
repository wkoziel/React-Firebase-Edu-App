import { getDocs } from 'firebase/firestore'

export const readQueryData = async (q: any) => {
  const querySnapshot = await getDocs(q)
  const data: any = []
  querySnapshot.forEach((doc) => {
    data.push(doc.id, ' => ', doc.data())
  })
  return data
}
