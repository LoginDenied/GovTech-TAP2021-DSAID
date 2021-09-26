import os
import os.path
import pandas as pd
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, f1_score

cwd = os.getcwd()
data = []
with open(os.path.join(cwd, "data", "car.data"), "r") as file:
    data = file.read()
data = [x.split(",") for x in data.split("\n")[:-1] if x != ""]
df = pd.DataFrame(data, columns=["buying", "maint", "doors", "persons", "lug_boot", "safety", "value"])

features = df[["maint", "doors", "lug_boot", "safety", "value"]]
features_enc = OrdinalEncoder(
    categories = [
        ["vhigh", "high", "med", "low"],
        ["2", "3", "4", "5more"],
        ["small", "med", "big"],
        ["low", "med", "high"],
        ["unacc", "acc", "good", "vgood"]
])
features_enc.fit(features)
encoded_features = features_enc.transform(features)

print("Buying class breakdown")
print(df["buying"].value_counts(), "\n")
score = df["buying"].values.reshape(-1, 1)
score_enc = OrdinalEncoder(
    categories = [
        ["vhigh", "high", "med", "low"]
    ]
)
score_enc.fit(score)
encoded_scores = score_enc.transform(score)
encoded_scores = [x[0] for x in encoded_scores]

x_train, x_test, y_train, y_test = train_test_split(encoded_features, encoded_scores, test_size=0.8, random_state=0)

best_clf = None
best_f1 = None
solvers = ["newton-cg", "sag", "saga", "lbfgs"]
multi_classes = ["ovr", "multinomial"]
penalties = {
    "newton-cg": ["l2", "none"],
    "sag": ["l2", "none"],
    "saga": ["l2", "none"],
    "lbfgs": ["l2", "none"]
}
for multi_class in multi_classes:
    for solver in solvers:
        for penalty in penalties[solver]:
            clf = LogisticRegression(penalty=penalty, multi_class=multi_class, solver=solver, random_state=0).fit(x_train, y_train)
            y_pred = clf.predict(x_test)
            cnf_matrix = confusion_matrix(y_test, y_pred)
            print("Confusion matrix when using %s, %s and %s" %(multi_class, solver, penalty))
            print(cnf_matrix)
            f1 = f1_score(y_test, y_pred, average="micro")
            print("F1 score is: %f\n" %(f1))
            if best_f1 == None or f1 > best_f1:
                print("Using %s, %s and %s\n" %(multi_class, solver, penalty))
                best_clf = clf
                best_f1 = f1

x_pred = features_enc.transform([["high", "4", "big", "high", "good"]])
y_pred = best_clf.predict(x_pred)
prediction = score_enc.inverse_transform([y_pred])
print("Predicted buying price is: %s" %(prediction[0][0]))