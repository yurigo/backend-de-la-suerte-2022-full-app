import { nhost } from "./_utils/nhost";


const cinco = 5;
const contador = 0;

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

    // res.json({token: token});

    nhost.graphql.setAccessToken(token);

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

    let encontradoOro = false;
    contador ++;

    if (contador === cinco) {
        contador = 0;
        encontradoOro = true
    }

    const hitResponse = await nhost.graphql.request(`
        mutation MyMutation($oro: Boolean = false) {
          insert_mina_pico(objects: {oro: $oro}) {
            affected_rows
          }
        }
      `,
          { oro: encontradorOro }
      );

    res.json({ grapql: hitResponse, contador: contador , encontradoOro: encontradoOro , cinco: cinco });


}
