import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type Props={
    id:string,
    title:string,
}



const Parent=styled(Box)`
    height:300px;
    // width:300px;
    min-width:275px;
   margin-bottom:50px;
   padding:0 10px;
  
    word-wrap:break-word;

    "&::-webkit-scrollbar": {
        width: '5px'
    },
    "&::-webkit-scrollbar-track": {
        background: '#f1f1f1'
    },
    "&::-webkit-scrollbar-thumb": {
        background: '#888'
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: '#555'
    },
`

 const Title=styled(Typography)`
    word-wrap:break-word;
    
 `

 const SubscribeButton=styled(Button)`
    width:120px;
    height:30px;
    background-color:#4CAF50;
    color:white;
    &:hover {
        background-color: #45a049;
    }
 `

 const Author=styled(Typography)`
    font-size:14px;
 `

 const AuthorSection=styled(Box)`
 display:flex;
    justify-content:space-between;
    padding:0 10px;
    align-items:center;
    margin-top:10px;
 `


 

    const Cards=(props:Props)=>{
        const navigate=useNavigate();

    return(
        <>
            
    <Parent >
    <Card sx={{ minWidth: 275,
    height:300,
    overflowX:'hidden',
    overflowY:'scroll',
    wordWrap:'break-word',
    position:'relative',
    "&::-webkit-scrollbar": {
        width: '5px'
    },
    "&::-webkit-scrollbar-track": {
        background: '#f1f1f1'
    },
    "&::-webkit-scrollbar-thumb": {
        background: '#888'
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: '#555'
    },
    
    marginBottom:'50px',
 }}>
      

        <CardContent>
   
          <Title variant="h6" >
          {props.title}
          </Title>

            <CardActions className='flex justify-between items-center'>
                <Button size="small"  style={{color:'#FFFFFF', background:'#217CA7', position:'absolute',bottom:'20px',left:'10px'}} onClick={()=>{navigate(`/edit-document/${props.id}`)}}>Open</Button>
            </CardActions>

        </CardContent>
      </Card>
    </Parent>
    
 
    </>
    )
    }

export default Cards;