# Handwritten Text Author Identification Using Compact Convolutional Transformer (CCT)

## Overview

This project focuses on identifying the authors of handwritten text by leveraging advanced computer models, specifically Compact Convolutional Transformers (CCT). The goal is to address the challenge of handwriting variation across different individuals and develop a robust solution that works well even with limited data and computational resources.

## Motivation

Variation in handwriting styles plays a critical role in author identification. Traditional models for author identification require extensive datasets and substantial computational resources, which can be limiting. With the introduction of the Vision Transformer (ViT), transformer models have been successfully adapted to computer vision problems. However, Vision Transformers require large-scale datasets and millions of parameters, making them computationally expensive and resource-intensive.

To overcome these limitations, we propose using the Compact Convolutional Transformer (CCT), a more efficient variant of transformers that performs well with smaller datasets. The CCT leverages convolutional tokenization and sequence pooling techniques, significantly reducing the number of parameters and computational costs, making it suitable for author identification from handwritten text.

## Key Features

- **Compact Convolutional Transformer (CCT)**: Utilizes CCT for effective author identification from handwriting with fewer parameters.
- **Efficient Data Processing**: Convolutional Tokenization and sequence pooling techniques for down-sampling parameters, reducing processing time and computational resources.
- **Generalization Capability**: Evaluates the model on multiple datasets to ensure generalizability across diverse handwriting samples.

## Methodology

1. **Data Preprocessing**: Handwritten text samples from various authors are preprocessed for consistency, normalization, and feature extraction.
2. **Model Architecture**:
   - The Compact Convolutional Transformer (CCT) is employed due to its ability to work with limited data and reduced computational requirements.
   - Convolutional tokenization helps in generating tokens that capture local structures in handwriting.
   - Sequence pooling reduces the number of parameters, making the model more efficient.
3. **Training and Evaluation**: The model is trained and tested on the IAM Handwriting Database, CVL Database, and a custom dataset to evaluate its performance in terms of accuracy and generalizability.

## Datasets

The model is tested on the following datasets:

- **IAM Handwriting Database**: A popular dataset for handwritten text recognition and author identification.
- **CVL Handwriting Database**: Another commonly used dataset for handwriting analysis tasks.
- **Custom Dataset**: A collection of diverse handwriting samples to test the model's ability to generalize across different styles and authors.

## Results

The proposed CCT-based model achieves high accuracy in identifying authors from handwritten text across various datasets, demonstrating its effectiveness and generalization capabilities.

## Installation

### Prerequisites

- Python 3.7+
- PyTorch
- NumPy
- OpenCV
- scikit-learn

