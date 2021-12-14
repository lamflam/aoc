package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func readInput(fname string) (input []int, err error) {
	bytes, err := ioutil.ReadFile(fname)
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(bytes), "\n")
	input = make([]int, 0, len(lines))
	for _, line := range lines {
		if len(line) == 0 {
			continue
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			return nil, err
		}
		input = append(input, num)
	}

	return input, nil
}

func calcFuel1(mass int) (fuel int) {
	return (mass / 3) - 2
}

func part1(input []int) (fuel int) {
	fuel = 0
	for i := 0; i < len(input); i++ {
		fuel += calcFuel1(input[i])
	}
	return fuel
}

func calcFuel2(mass int) (fuel int) {
	fuel = (mass / 3) - 2

	if fuel > 0 {
		fuel += calcFuel2(fuel)
		return fuel
	} else {
		return 0
	}
}

func part2(input []int) (fuel int) {
	fuel = 0
	for i := 0; i < len(input); i++ {
		fuel += calcFuel2(input[i])
	}
	return fuel
}

func main() {
	input, err := readInput("day1/input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("part1: ", part1(input))
	fmt.Println("part2: ", part2(input))
}
