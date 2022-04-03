import { nhost } from "./_utils/nhost";

export default async (req, res) => {
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
  
    // enable CORS for OPTIONS (no need to return any body)
    if (req.method === 'OPTIONS') {
      console.log('request is OPTIONS, allow all');
      return res.status(204).send();
    }

    const token = req?.headers?.authorization;

    if(!token) return res.status(401).json({
        err: "Unauthorized",
        headers: req.headers
    });

    res.json({token: token});

    // const mutationResponse = await nhost.graphql.request(`
    //     mutation FoundGold($_eq: uuid!) {
    //         insert_mina_mina(objects: {}, on_conflict: {constraint: mina_pkey}) {
    //             affected_rows
    //         }
    //         update_mina_mina(where: {user: {id: {_eq: $_eq}}}, _inc: {oro: 1}) {
    //             affected_rows
    //         }
    //     }
    //     `,
    //     { _eq: nhost.auth.session.user.id },
    //     // { _eq: '4bdc7de1-e85c-49d6-9db8-50a3e195efd4' },
    // )

    // res.json({ mutationResponse})


}
