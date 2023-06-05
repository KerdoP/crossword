import React from 'react';
import TitleDescriptionBox from '../components/TitleDescriptionBox';
import { data } from '../storage';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const ListView = () => {
    const navigate = useNavigate();
    return (
        <body style={styles.b1}>
            <div style={styles.mainContainer}>
                <div style={styles.secondContainer}>
                    <NavigationBar />
                    <div style={styles.listView}>
                        {data.map((item) => {
                            return (
                                <div
                                    style={styles.item}
                                    key={item.id}
                                    onClick={() => {
                                        navigate(`/Details/${item.id}`);
                                    }}
                                >
                                    <div style={styles.titleDescriptionBox}>
                                        <TitleDescriptionBox title={item.title} description={item.description} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </body>
    );
}

const styles = {
    b1: {
        height: '100%',
        width: '100%',
    },
    mainContainer: {
        backgroundColor: '#fafcfe',
        height: '100vh',
        paddingTop: 75,
    },
    secondContainer: {
        backgroundColor: '#eef1f7',
        marginLeft: 56,
        marginRight: 56,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    listView: {
        columnGap: 500,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: 300,
        marginBottom: 'auto',
    },
};

export default ListView;
