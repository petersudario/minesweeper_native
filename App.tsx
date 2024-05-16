import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { generate_mine_board } from './src/functions';
import params from './src/params';
import Minefield from './src/components/Minefield';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.createState();
    }

    minesAmount = () => {
        const cols = params.getColumnsAmount();
        const rows = params.getRowsAmount();
        return Math.ceil(cols * rows * params.difficultLevel);
    }

    createState = () => {
        const cols = params.getColumnsAmount();
        const rows = params.getRowsAmount();
        return {
            board: generate_mine_board(rows, cols, this.minesAmount()),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Iniciando o Mines!</Text>
                <Text style={styles.instructions}>Tamanho da grade:
                    {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
                <View style={styles.board}>
                    <Minefield board={this.state.board} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#AAA',
    }
});