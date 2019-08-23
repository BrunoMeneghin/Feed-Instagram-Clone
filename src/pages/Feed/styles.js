import styled from 'styled-components/native';

export const Post = styled.View `
    margin-top: 10px; 
`;

export const Header = styled.View`
    padding: 15px; 
    flex-direction: row; 
    align-items: center; 
`; 

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px; 
    backgroundColor: #f5f5f5; 
`; 

export const Name = styled.Text``; 

export const Description = styled.Text`
    padding: 15px; 
    line-height: 18px; 
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small', 
    color: '#999', 
})`
    margin: 30px 0; 
`;

